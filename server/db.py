import mysql.connector
import secrets

config = {
    "user": "root",
    "password": "",
    "host": "localhost",
    "port": "3306",
    "database": "cloudbox"
}

def DatabaseStatus(): # returns true if database is online
    try:
        con = mysql.connector.connect(**config)
    except:
        return False
    con.close()
    return True


def CheckForCredentials(username,password):
    con = mysql.connector.connect(**config)
    print("Searching credentials:",username,password)

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
    con = mysql.connector.connect(**config)
    cursor = con.cursor()
    query = "UPDATE users SET token = %s WHERE id = %s"
    cursor.execute(query,(token,id))
    con.close()
    print("Generated token for user ID:",id)
    return token

def CheckToken(token):
    con = mysql.connector.connect(**config)
    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE token = %s"
    cursor.execute(query,(token,))
    result = cursor.fetchone()
    con.close()
    print("Checked token :",token ,result)
    return result