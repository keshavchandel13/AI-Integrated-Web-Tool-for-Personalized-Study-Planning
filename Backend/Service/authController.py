from flask import request, jsonify
def signup_controller():
    print("In signup")
    return jsonify({'message':"In signup"}), 200


def login_controller():
    print("In login")
    return jsonify({'message': 'Invalid credentials'}), 200
