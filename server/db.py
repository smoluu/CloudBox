import mysql.connector

config = {
    "user": "root",
    "password": "",
    "host": "localhost",
    "port": "3306",
    "database": "cloudbox"
}

def CheckDBConnection():
    con = mysql.connector.connect(**config)
    result = con.is_connected()
    con.close()
    return result
def CheckForCredentials(username,password):
    con = mysql.connector.connect(**config)

    cursor = con.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query,(username,password))
    res = cursor.fetchone()
    con.close()
    return res

