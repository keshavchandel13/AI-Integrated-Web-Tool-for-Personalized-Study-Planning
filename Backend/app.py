from flask import Flask
from flask_cors import CORS

# Imports-->
from config.db import get_db, close_connection

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Db teardown-->
app.teardown_appcontext(close_connection)

@app.route("/")
def helloWorld():
  db = get_db()
  return "Hello"

if __name__ == '__main__':
    app.run()