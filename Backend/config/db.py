import sqlite3
from flask import g
DATABASE = 'database.db'

# Establish DB connnection-->
def get_db():
    if 'db'  not in g:
        print("Connecting to DB..")
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
        print("Connected to db")
        
    return g.db

# Close Db connection-->
def close_connection(exception=None):
    db = g.pop('db',None)
    if db is not None:
        print("Closing Db connection")
        db.close()
        print("Db Connection closed")