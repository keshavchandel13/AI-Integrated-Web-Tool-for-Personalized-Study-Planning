from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
def helloWorld():
  return "Hello"

if __name__ == '__main__':
    app.run()