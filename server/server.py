#activate .venv:    .\.venv\scripts\activate
# run server:       flask --app server.py run
# debug server:       flask --app server.py --debug run
import os
from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from db import *
import json
from loguru import logger
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.debug = True
cors = CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http//:localhost:3000", "allow_headers": "*", "expose_headers": "*"}})
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1000 * 1000 * 1000 # in gigabytes
if not os.path.exists(app.config["UPLOAD_FOLDER"]):
    os.makedirs(app.config["UPLOAD_FOLDER"]) #creates folder for uploads

@app.route("/api/login", methods=["POST"])
@cross_origin()
def Login():
    if "Authorization" in request.headers:
        token = request.headers.get("Authorization")
        if CheckToken(token):
            return {"auth": True}
        else:
            return {"auth": False}
        
    if "Authorization" not in request.headers:
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
    
@app.route("/api/register", methods=["POST"])
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

@app.route("/api/upload", methods=["POST","GET","OPTIONS"])
@cross_origin()
def Upload():
    if request.method == "POST":
        if "file" not in request.files:
            return("no files",500)
        if "Authorization" in request.headers:
            token = request.headers.get("Authorization")
            checkToken = CheckToken(token)
            if checkToken is not None:
                id = str(checkToken["id"])
                fileList = request.files.getlist("file")
                if not os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"],id)):
                    os.makedirs(os.path.join(app.config["UPLOAD_FOLDER"],id))
                for file in fileList:
                    fileName = secure_filename(file.filename)
                    file.save(os.path.join(app.config["UPLOAD_FOLDER"],id, fileName))
                    print(os.path.join(app.config["UPLOAD_FOLDER"],id, fileName))
                return ("succesfull",200)
            return ("no auth",200)
        return ("no auth",200)

@app.route("/api/files", methods=["POST"])
@cross_origin()
def Files():
    if request.method == "POST":
        if "Authorization" in request.headers:
            token = request.headers.get("Authorization")
            checkToken = CheckToken(token)
            if checkToken is not None:
                id = str(checkToken["id"])
                if  os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"],id)):
                    fileNames = os.listdir(os.path.join(app.config["UPLOAD_FOLDER"],id))
                    fileSizes = []
                    with os.scandir(os.path.join(app.config["UPLOAD_FOLDER"],id)) as entries:
                        for entry in entries:
                            fileSizes.append(entry.stat().st_size)
                    response = {}
                    response["names"] = fileNames
                    response["sizes"] = fileSizes
                    
                    return(response,200)
        return ("",200)

