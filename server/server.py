#activate .venv:    .\.venv\scripts\activate
# run server:       flask --app server.py run
# debug server:       flask --app server.py -- debug run
from flask import Flask
from flask import request
from flask_cors import CORS
from db import *
import json
from loguru import logger

logger.add("serverlog.log")

app = Flask(__name__)
CORS(app, supports_credentials=True)
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

    return ("",200)
""" TO DO 
encrypt incoming credentials
logger
"""



def GetFiles(username,token):
    return