from flask import jsonify
from config.db import get_db

def getuser(userId):
    try:
        print(userId)
        db = get_db()
        user = db.execute(
            "SELECT * FROM users WHERE id = ?",
            (userId,)
        ).fetchone()
        print(user)

        if user is None:
            return jsonify({"message": "User not found"}), 404

        user_dict = dict(user)

        return jsonify({
            "message": "User fetched successfully",
            "user": user_dict
        }), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Internal server error"}), 500
