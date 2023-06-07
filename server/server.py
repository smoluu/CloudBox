#activate .venv:    .\.venv\scripts\activate
# run server:       flask --app server.py run
from flask import Flask
from flask import request,jsonify
from flask_cors import CORS
from db import *
import json


app = Flask(__name__)
CORS(app, supports_credentials=True)
@app.route("/api/login", methods=["POST"])
def index():
    if CheckDBConnection() == False:
        return ("Cannot connect to database:",500)

    #check for DB connection
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

