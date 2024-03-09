from flask import request,make_response,jsonify
from db import db
from models import User,BlacklistToken
from flask_restx import Namespace, fields, Resource
from flask_jwt_extended import create_access_token, jwt_required, current_user,get_jwt
from werkzeug.security import generate_password_hash, check_password_hash

ns = Namespace('auth', description='operation relateds users')

login_request = ns.model('login_request', {
    "username": fields.String(required=True, description='username'),   
    "email": fields.String(required=True, description='email'),
    "password": fields.String(required=True, description='password for username'),
})


@ns.route("/who_am_i")
class WhoAmI(Resource):
    
    @jwt_required()
    @ns.doc(security='Bearer')
    def get(self):

        username = current_user.username
        role = current_user.role.name
        email = current_user.email_id
        
        return make_response(jsonify({"user_name": username, "user_role": role, "email": email}),200)


    
@ns.route("/login")
class UserLogin(Resource):
    @ns.expect(login_request)
    @ns.doc(security=[])
    def post(self):
        
        user_data = request.get_json()
        json_fields = user_data.keys()
        if "username" in json_fields:
            user = db.session.query(User).filter_by(username=user_data["username"]).first()
        elif "email" in json_fields:
            user = db.session.query(User).filter_by(email_id=user_data["email"]).first()
        else:
            return make_response(jsonify({ 'message': "name or email not found"}), 400)
        
        if check_password_hash(user.password, user_data["password"]):
            access_token = create_access_token(identity=user)
            return make_response(jsonify({"access_token": "Bearer "+ access_token}),200)
        
        return make_response(jsonify({"message":"invalid credentials."}),401)
    
@ns.route("/logout")
class LogOut(Resource):    
    @jwt_required()
    @ns.doc(security='Bearer')
    
    def get(self):
        
        jti = get_jwt()["jti"]
        token = BlacklistToken(jti=jti)
        db.session.add(token)
        db.session.commit()
        return make_response(jsonify({"message": "Successfully logged out."}),200)
    