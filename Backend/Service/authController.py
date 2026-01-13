from flask import request, jsonify
from config.db import get_db
from extension import bcrypt
 
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
    return jsonify({'message':"Signup Completed"}), 200


def login_controller():
    cnt = get_db()
    data = request.json
    email = data['email']
    password = data['password']
    
    # Find user
    user = cnt.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401
    
    
    stored_hash = user['password_hash'] if 'password_hash' in user.keys() else user[3]
    
    # Verify password
    if bcrypt.check_password_hash(stored_hash, password):
        user_data = {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "branch": user["branch"],
        }
        return jsonify({"message": "Login successful", 'user':user_data}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401
