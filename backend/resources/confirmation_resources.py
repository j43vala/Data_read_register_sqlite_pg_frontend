from flask_restx import Namespace, Resource
from flask import jsonify, make_response
from db import db
from models import User
from services.email_services import confirm_token

ns = Namespace('confirmation', description='user confirmation')

@ns.route("/<token>")
class UserConfirmation(Resource):
    def get(self,token):
         
        email = confirm_token(token)

        if not email:
            return make_response(jsonify({"message": "not match token"}))
        user = User.query.filter_by(email_id=email).first()
        
        if user:
            user.active = True
            db.session.add(user)
            try:
                db.session.commit()
            except Exception as e:
                return make_response(jsonify({'message': f'Not able to confirm, error: {str(e)}'}), 400)
        else:
            return make_response(jsonify({"message":"user doesn't exist."}))
    
        return make_response(jsonify({"message": "Confirmation Successfully. Now you can log in."}))
            
