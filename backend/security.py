from flask_jwt_extended import JWTManager
from db import db
from models import User, BlacklistToken
jwt = JWTManager()

#identify the current user
@jwt.user_identity_loader
def user_identity_lookup(user):
    payload = {"name":user.username}
    return payload

#if user not exist from jwt token
@jwt.user_lookup_loader
def user_lookup_callback(jwt_header,jwt_data):
    
    identity = jwt_data["sub"]
    return User.query.filter_by(username=identity["name"]).one_or_none()

#check whether the jwt_token is exist or not
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = db.session.query(BlacklistToken.id).filter_by(jti=jti).scalar()
    return token is not None
    


