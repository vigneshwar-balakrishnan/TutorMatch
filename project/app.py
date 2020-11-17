from flask import Flask, render_template, url_for, request, session, redirect
from flask_login import login_user,logout_user,login_required
# from flask.ext.pymongo import PyMongo
import bcrypt
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
app = Flask(__name__)



# mongo = PyMongo(app)
@app.route('/main/<profile>/<subject>',methods = ['GET','POST'])
def profilepage(profile,subject):
    table_teacher = dynamodb.Table('Tutor')
    check_user = table_teacher.scan(FilterExpression=Attr('subject').eq(subject))
    print(check_user)

    if request.method == 'GET':
        check_user = table_teacher.scan(FilterExpression=Attr('subject').eq(subject))
        # for i in check_user['Items']:
        #     print(i['name'], ":", i['subject_code'])
        
        return ({"response":check_user['Items']})
    return("Created")



@app.route('/')
def index():
    if session:
        print(session['username'])
        return redirect(url_for('profilepage',  profile = session['username'], subject = session['subject']))

    return render_template('index.html')

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method=='GET':
        return render_template('index.html')
    table = dynamodb.Table('tutormatch')
    print(request.form['username'])
    check_user = table.query(
        KeyConditionExpression=Key('name').eq(request.form['username'])
        )
            
  
    # login_user = users.find_one({'name' : request.form['username']})

    if len(check_user['Items'])!=0:
        if bcrypt.checkpw(request.form['pass'].encode('utf-8'),check_user['Items'][0]['password'].value):
            session['username'] = request.form['username']
            return redirect(url_for('index'))

    return 'Invalid username/password combination'

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        table = dynamodb.Table('tutormatch')
        response = table.get_item(Key={'name':request.form['username']})
        existing_user = response['ResponseMetadata']['HTTPHeaders']['content-length']
           
              
        # existing_user = users.find_one({'name' : request.form['username']})
        print(type(existing_user),existing_user)

        if existing_user=='2':
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            table.put_item(
            Item={
                    'name': request.form['username'],
                    'password': hashpass,
                    'subject':request.form['subject']
                   
                }
            )
            session['subject'] = request.form['subject']
            
            # users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            return redirect(url_for('index'))
       
        return 'That username already exists!'

    return render_template('register.html')

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)