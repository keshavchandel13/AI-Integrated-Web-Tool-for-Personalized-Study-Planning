from flask import Flask
from flask_cors import CORS

# Imports-->
from config.db import get_db, close_connection
from Routes.authRoute import auth_blueprint


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Db teardown-->
app.teardown_appcontext(close_connection)

# API - Blueprint for moduler codebase
app.register_blueprint(auth_blueprint, url_prefix='/api/auth')

if __name__ == '__main__':
    app.run(debug=True)