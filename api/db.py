import mysql.connector
import secrets
import datetime
from dotenv import dotenv_values

# get config.yml

env_config = dotenv_values(".env")
DBconfig = {
    "user": "root",
    "password": "password",
    "host": "localhost",
    "port": "3306",
    "database": "cloudbox"
}
#DBconfig["user"] = env_config["MYSQL_USERNAME"]
#DBconfig["password"] = env_config["MYSQL_USERNAME"]

config = {
    "tokenExpireTime":    "30", #in minutes
}
tables = {
    "users"
}
# creates required tables and columns in DB if not found
def CheckDatabaseTables():
    if DatabaseStatus() == True:
        con = mysql.connector.connect(**DBconfig)
        cursor = con.cursor()
        query = "SHOW TABLES LIKE 'users'"
        cursor.execute(query)
        result = cursor.fetchone()
        if result:
            print(" * Required tables found!")
        else:
            query = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), token VARCHAR(255))"
            cursor.execute(query)
            print("Created Table: ""users")
        con.close()



def DatabaseStatus(): # returns true if database is online
    try:
        con = mysql.connector.connect(**DBconfig)
    except Exception as error:
        print("Database offline")
        print(error)
        return False
    con.close()
    return True


def CheckForCredentials(username,password):
    con = mysql.connector.connect(**DBconfig)
    print("Checking credentials:",username,password)

    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query,(username,password))
    result = cursor.fetchone()
    if(result):
        print("Credentials found for:",username)
    con.close()
    return result

    
def GenerateToken(id):
    token = secrets.token_urlsafe()
    tokenExpireDate = datetime.datetime.now() + datetime.timedelta(minutes=30)
    print(str(tokenExpireDate))
    con = mysql.connector.connect(**DBconfig)
    cursor = con.cursor()
    query = "UPDATE users SET token = %s WHERE id = %s"
    cursor.execute(query,(token,id))
    con.commit()
    #print(cursor.fetchall())
    con.close()
    print("Generated token: {token} for user ID:",id)
    return token

def CheckToken(token):
    con = mysql.connector.connect(**DBconfig)
    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE token = %s"
    cursor.execute(query,(token,))
    result = cursor.fetchone()
    con.close()
    print("Checked token",token)
    return result

def RevokeToken(username,token):
    con = mysql.connector.connect(**DBconfig)
    cursor = con.cursor()
    query = "UPDATE users SET token = %s WHERE token = %s AND username = %s"
    cursor.execute(query,("",token,username))
    con.commit()
    con.close()
    print("removed token for user:",username)
    return True


def isUsernameFree(username):
    con = mysql.connector.connect(**DBconfig)
    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query,(username,))
    result = cursor.fetchone()
    con.close()
    if result:
        return False
    return True

def RegisterUser(username,password):
    con = mysql.connector.connect(**DBconfig)
    cursor = con.cursor(dictionary=True)
    query = "INSERT INTO users ( id , username, password ) VALUES ( NULL, %s, %s )"
    cursor.execute(query,(username,password))
    con.commit()
    con.close()
    print("Registered user:",username)

