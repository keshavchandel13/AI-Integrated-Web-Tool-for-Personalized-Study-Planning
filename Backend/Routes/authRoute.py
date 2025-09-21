from flask import Blueprint
from Service.authController import login_controller, signup_controller

auth_blueprint = Blueprint('auth', __name__)

# Login route
@auth_blueprint.route('/login', methods=['POST'])
def login_route():
    return login_controller()

# Signup route
@auth_blueprint.route('/signup', methods=['POST'])
def signup_route():
    return signup_controller()
