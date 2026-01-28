from flask import jsonify, request
from config.db import get_db
import cloudinary
import cloudinary.uploader
import cloudinary.api
config = cloudinary.config(secure=True)
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

def updateProfile(id):
    try:
        db = get_db()

        name = request.form.get('name')
        college = request.form.get('college')
        bio = request.form.get('bio')
        branch = request.form.get('branch')
        avatar = request.files.get('avatar')

        image_url = None
        if avatar and avatar.mimetype.startswith("image/"):
            response = cloudinary.uploader.upload(
                avatar,
                folder="avatars",
                unique_filename=True
            )
            image_url = response["secure_url"]

        db.execute(
            '''
            UPDATE users
            SET username = ?, college = ?, bio = ?, branch = ?, avatar = ?
            WHERE id = ?
            ''',
            (name, college, bio, branch, image_url, id)
        )

        db.commit()

        return jsonify({"message": "User Detail Updated"}), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Error in updating profile"}), 500
