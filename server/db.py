import mysql.connector

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

