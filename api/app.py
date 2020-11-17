from flask import Flask, render_template, url_for, request, session, redirect
# from flask.ext.pymongo import PyMongo
import bcrypt
import boto3

dynamodb = boto3.resource('dynamodb')
app = Flask(__name__)


# mongo = PyMongo(app)

@app.route('/')
def index():
    if 'username' in session:
        return 'You are logged in as ' + session['username']

    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    login_user = users.find_one({'name' : request.form['username']})

    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
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
                    'password': hashpass
                   
                }
            )
            
            # users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            return redirect(url_for('index'))
       
        return 'That username already exists!'

    return render_template('register.html')

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)