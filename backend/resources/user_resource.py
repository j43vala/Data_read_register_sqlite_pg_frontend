from db import db
from models import User,UserRole
from passlib.hash import pbkdf2_sha256
from flask_restx import Namespace, fields, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, make_response,request
from flask_jwt_extended import current_user,jwt_required

ns = Namespace('users', description='operation relateds users')

user_resgister = ns.model('user_register', {
    'username': fields.String(required=True, description='your_name'),
    'email': fields.String(required=True, description='your_email'),
    'password': fields.String(required=True, description='your_password'),
    'role': fields.String(required=True, description='your_role')
})


@ns.route("/resgister")
class UserResgister(Resource):
    @jwt_required()
    @ns.expect(user_resgister)
    def post(self):
        user_data = request.get_json()
        
        if current_user.role.name not in ["super_admin","admin"]:
            return make_response(jsonify({"message":"you are not authorize"}))
        
        user_role = UserRole.query.filter(UserRole.name==user_data["role"]).first()
        if user_role is None:
            return make_response(jsonify({"message":"please enter role admin and user."}))
        
        if current_user.role.name=="admin":
            if user_data["role"] in ["super_admin","admin"]:
                return make_response(jsonify({"message":"please enter role user."}))
            
        
        if User.query.filter(User.username==user_data["username"]).first():
            return make_response(jsonify({"message":"A user with that name is already is exists."}))
            
        hashed_password = generate_password_hash(user_data["password"],method="sha256")
        user = User(username=user_data["username"], password=hashed_password, email_id=user_data["email"],role_id=user_role.id)
        db.session.add(user)
        
        db.session.commit()
        print('user: ', user)
        
        return {"message":"User created successfully."},201

