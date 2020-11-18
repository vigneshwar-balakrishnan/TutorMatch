from flask import Flask, render_template, url_for, request, session, redirect
from flask_restful import Api,Resource,reqparse
# from flask_login import login_user,logout_user,login_required
# from flask.ext.pymongo import PyMongo
import bcrypt
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
app = Flask(__name__)
table = dynamodb.Table('tutormatch')
login_form_args = reqparse.RequestParser()
login_form_args.add_argument("name",type=str,help="type in the name")


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
        return render_template('home.html', Items=check_user['Items'])
   



@app.route('/')
def index():
    if session:
        print(session['username'])
        return redirect(url_for('profilepage',  profile = session['username'], subject = session['subject']))

    return render_template('index.html')

@app.route('/home')
def home():
    if request.method=='GET':
        return render_template('home.html' )

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method=='GET':
        return render_template('login.html')
    table = dynamodb.Table('tutormatch')
    print(request.form['username'])
    check_user = table.query(
        KeyConditionExpression=Key('name').eq(request.form['username'])
        )
    
            
  
    # login_user = users.find_one({'name' : request.form['username']})

    if len(c)!=0:
        if bcrypt.checkpw(request.form['pass'].encode('utf-8'),check_user['Items'][0]['password'].value):
            session['username'] = request.form['username']
            # session['role'] = check_user['Items'][0]['role']
            
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
                    'subject':request.form['subject'],
                    # 'role':request.form['role']
                    
                   
                }
            )
            session['subject'] = request.form['subject']
            
            # users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            session['subject'] = session['subject']
            return redirect(url_for('index'))
       
        return 'That username already exists!'

    return render_template('/signup/index.html')

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)