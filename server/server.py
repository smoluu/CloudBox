#activate .venv:    .\.venv\scripts\activate
# run server:       flask --app server.py run
# debug server:       flask --app server.py -- debug run
import os
from flask import Flask
from flask import request
from flask_cors import CORS,cross_origin
from db import *
import json
from loguru import logger
from werkzeug.utils import secure_filename

logger.add("serverlog.log")
UPLOAD_FOLDER = '/users'

app = Flask(__name__)
app.debug = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/login", methods=["POST"])
def Login():
    if "Authorization" in request.headers:
        token = request.headers.get("Authorization")
        username = request.json["username"]
        if CheckToken(username,token):
            return {"auth": True}
        else:
            return {"auth": False}
    elif request:
        #check for database connection
        if DatabaseStatus() == False:
            return {"error": "database offline - 500"}

        username = request.json["username"]
        password = request.json["password"]
        # result is a dictionary
        result = CheckForCredentials(username,password)
        print(result)
        response = {
            "username": username,
            "auth": False,
        }
        if result:
            id = result["id"]
            token = result["token"]
            token = GenerateToken(id)
            response["token"] = token


        return response
    else:
        return ("",400)
    
@app.route("/api/register", methods=["POST,GET"])
def Register():
    if DatabaseStatus() == False:
        return {"error": "database offline - 500"}
    if request:
        username = request.json["username"]
        password = request.json["password"]
        response = {
            "username": username,
            "succesful": "",
            "message": ""
        }

        if isUsernameFree(username):
            RegisterUser(username,password)
            response["succesful"] = True
            response["message"] = "Succesfully registered"
        else:
            response["succesful"] = False
            response["message"] = "Username Taken"
        return response

@app.route("/api/logout", methods=["POST"])
def Logout():
    if request.data:
        username = request.json["username"]
        token = request.json["token"]
        response = {
            "username": username,
            "succesful": "",
            "message": ""
        }
        if RevokeToken(username,token):
            response["succesful"] = True
            response["message"] = "succesfully logged out"
        return response

    return ("ok",200)

@app.route("/api/upload", methods=["POST"])
@cross_origin()
def Upload():
    if request:
        #uploaded_files = request.form["file"]
        #print(request.get_data())
        files = request.form.getlist("fileArray")
        print(files)
        for file in files:
            fn = secure_filename(file)
            #file.save(os.path.join(UPLOAD_FOLDER, fn))
    return ("",200)


def GetFiles(username,token):
    return