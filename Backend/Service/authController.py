from flask import request, jsonify, current_app
from config.db import get_db
from extension import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
def signup_controller():
    cnt =  get_db()
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']
    
    # check email already exist
    user  = cnt.execute('''SELECT email FROM users WHERE email = ?''', (email,)).fetchone()
    if(user):
        return jsonify({"message":"user already exist"}), 409
    
    # Hashed pass
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # If user doesn't exist
    cnt.execute(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    (name, email, hashed_password)
    )
    cnt.commit()
    return jsonify({'message':"Signup Completed"}), 201


def login_controller():
    cnt = get_db()
    data = request.json
    email = data['email']
    password = data['password']
    
    # Find user
    user = cnt.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    print(user["id"])
    if not user:

        return jsonify({"message": "Invalid credentials"}), 401
    
    
    stored_hash = user['password_hash'] 

        # Verify password
    if not bcrypt.check_password_hash(stored_hash, password):
            print("Bhai crash ho gya")
            return jsonify({"message": "Invalid credentials"}), 401

    # jwt encoding
    token = jwt.encode({
        'sub':str(user["id"]),
        'iat': datetime.now(timezone.utc),
        'exp': datetime.now(timezone.utc) + timedelta(hours=72)
    },
        current_app.config['JWT_SECRET_KEY'],
        algorithm="HS256"
    )
    user_data = {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "branch": user["branch"],
        "access_token": token
        }
    return jsonify({"message": "Login successful", 'user':user_data}), 200
