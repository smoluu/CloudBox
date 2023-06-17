#activate .venv:    .\.venv\scripts\activate
# run server:       flask --app server.py run
# debug server:       flask --app server.py -- debug run
from flask import Flask
from flask import request,jsonify
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
        if CheckToken(token):
            return {"auth": True}
        else:
            return {"auth": False}
    if request:
        #check for database connection
        if DatabaseStatus() == False:
            return {"error": "database offline - 500"}

        username = request.json["username"]
        password = request.json["password"]
        # result is a dictionary
        result = CheckForCredentials(username,password)
        print(result)
        response = {
            "name": username,
            "password": password,
            "auth": False,
        }
        if result:
            id = result["id"]
            token = result["token"]
            token = GenerateToken(id)

            response["auth"] = True
            response["token"] = token


        return json.dumps(response)
    else:
        return ("",400)
""" TO DO 
encrypt incoming credentials
logger
"""