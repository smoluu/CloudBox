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
    print("Generated token for ID:",id)
    return token

def CheckToken(username,token):
    con = mysql.connector.connect(**config)
    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s AND token = %s"
    cursor.execute(query,(username,token))
    result = cursor.fetchone()
    con.close()
    print("Checked token for user :",username)
    return result


def isUsernameFree(username):
    con = mysql.connector.connect(**config)
    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query,(username,))
    result = cursor.fetchone()
    con.close()
    if result:
        return False
    return True

def RegisterUser(username,password):
    con = mysql.connector.connect(**config)
    cursor = con.cursor(dictionary=True)
    query = "INSERT INTO users ( id , username, password ) VALUES ( NULL, %s, %s )"
    cursor.execute(query,(username,password))
    con.commit()
    con.close()
    print("Registered user:",username)

def RevokeToken(username,token):
    con = mysql.connector.connect(**config)
    cursor = con.cursor()
    query = "UPDATE users SET token = %s WHERE token = %s AND username = %s"
    cursor.execute(query,("",token,username))
    con.commit()
    con.close()
    print("removed token for user:",username)
    return True