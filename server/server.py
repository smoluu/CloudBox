#activate .venv:    .\.venv\scripts\activate
# run server:       flask --app server.py run
# debug server:       flask --app server.py -- debug run
from flask import Flask
from flask import request,jsonify
from flask_cors import CORS
from db import *
import json
import sys
from loguru import logger

logger.add("serverlog.log", format = "<red>[{level}]</red> Message : <green>{message}</green> @ {time}", colorize=True)


app = Flask(__name__)
CORS(app, supports_credentials=True)
@app.route("/api/login", methods=["POST"])
def index():
    #check for database connection
    if DatabaseStatus() == False:
        return {"error": "database offline - 500"}
    
    username = request.json["username"]
    password = request.json["password"]
    # result is a dictionary
    result = CheckForCredentials(username,password)
    response = {
        "name": username,
        "password": password,
        "auth": False,
    }

    if result:
        response["auth"] = True

    return json.dumps(response)

