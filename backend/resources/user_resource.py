from db import db
from models import User,UserRole
from flask_restx import Namespace, fields, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, make_response,request
from flask_jwt_extended import current_user,jwt_required
from services.email_services import send_password_reset_email,send_confirmation_email
import secrets

ns = Namespace('users', description='operation relateds users')

user_resgister = ns.model('user_register', {
    'username': fields.String(required=True, description='your_name'),
    'email': fields.String(required=True, description='your_email'),
    'password': fields.String(required=True, description='your_password'),
    'role': fields.String(required=True, description='your_role')
})

user_update = ns.model('user_update', {
    'username': fields.String(required=True, description='your_name'),
    'email': fields.String(required=True, description='your_email'),
    'role': fields.String(required=True, description='your_role')
})

change_password = ns.model('change_password',{
    'old_password' : fields.String(required=True, description='your_old_password'),
    'new_password' : fields.String(required=True, description='your_new_password')
    })

reset_password = ns.model('reset_password',{
    'username' : fields.String(required=True, description='your_username'),
    'email' : fields.String(required=True, description='your_email')
    })



@ns.route("/")
class UserResgister(Resource):
    @jwt_required()
    @ns.expect(user_resgister)
    def post(self):
        '''create new user'''
        user_data = request.get_json()
        
        if current_user.role.name not in ["super_admin","admin"]:
            return make_response(jsonify({"message":"you are not authorize"}),401)
        
        user_role = UserRole.query.filter(UserRole.name==user_data["role"]).first()
        
        if user_role is None:
            return make_response(jsonify({"message":"please enter role admin and user."}))
        
        if current_user.role.name=="admin":
            if user_data["role"] in ["super_admin","admin"]:
                return make_response(jsonify({"message":"please enter role user."}))
            
        
        if User.query.filter(User.username==user_data["username"]).first():
            return make_response(jsonify({"message":"A user with that name is already is exists."}))
        
        if User.query.filter(User.email_id==user_data["email"]).first():
            return make_response(jsonify({"message":"A user with that email is already is exists."}))
            
        hashed_password = generate_password_hash(user_data["password"],method="sha256")
        user = User(username=user_data["username"], password=hashed_password, email_id=user_data["email"],role_id=user_role.id)
        db.session.add(user)
        try:
            send_confirmation_email(user.email_id)
            db.session.commit()
            return make_response(jsonify({"message":"User created successfully."}),201)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"message": f'Not able to Execute Create User API, error: {str(e)}'}), 400)
    
    @jwt_required()
    def get(self):
        '''get all the user details'''

        # if current_user.role.name not in ["super_admin","admin"]:
        #     return make_response(jsonify({"message":"you are not authorize"}))
        
        users = User.query.all()
        return_fields = ["id","username","email_id"]
        output =[]
        
        if current_user.role.name =="admin":
            for user in users:
                if user.role.name !='super_admin':
                        
                        user_data = {}
                        user_data["role"]= {}
                        user_data["role"]["name"] = user.role.name
                        for field in return_fields:
                            user_data[field] = getattr(user,field)

                        output.append(user_data)
        elif current_user.role.name =="super_admin":
            for user in users:                    
                user_data = {}
                user_data["role"]= {}
                user_data["role"]["name"] = user.role.name
                for field in return_fields:
                    user_data[field] = getattr(user,field)

                output.append(user_data)
        else:
            return make_response(jsonify({"message":"you are not authorize"}),401)

        return make_response(jsonify({"user_list":output}),200)
    

@ns.route("/<int:id>")
class UserById(Resource):

    @jwt_required()
    def get(self,id):
        '''get the specific user details by id'''

        user = User.query.filter_by(id=id).first()
        

        return_fields = ["username","email_id"]
        output =[]
        if user:
            if current_user.role.name =="admin":            
                if user.role.name !='super_admin':                    
                        user_data = {}
                        user_data["role"]= {}
                        user_data["role"]["name"] = user.role.name
                        for field in return_fields:
                            user_data[field] = getattr(user,field)
                        output.append(user_data)
                else:
                    return make_response(jsonify({"message":"user not found"}),404)
            elif current_user.role.name =="super_admin":                   
                    user_data = {}
                    user_data["role"]= {}
                    user_data["role"]["name"] = user.role.name
                    for field in return_fields:
                        user_data[field] = getattr(user,field)

                    output.append(user_data)
            else:
                user_data = {}
                user_data["role"]= {}
                user_data["role"]["name"] = current_user.role.name
                for field in return_fields:
                    user_data[field] = getattr(current_user,field)

                output.append(user_data)
            return make_response(jsonify({"user_list":output}),200)
        else:
            return make_response(jsonify({"message":"user not found"}),404)
        
    #update the user details
    @jwt_required()
    @ns.expect(user_update)
    def put(self,id):
        '''update the user details by id'''
        user_data = request.get_json()

        if User.query.filter(User.username==user_data["username"]).first():
            return make_response(jsonify({"message":"A user with that name is already is exists."}))
        if User.query.filter(User.email_id==user_data["email"]).first():
            return make_response(jsonify({"message":"A user with that email is already is exists."}))

        if current_user.role.name in ["admin","super_admin"]:
            user = User.query.filter_by(id=id).first()
        elif id==current_user.id:
            user = current_user
        else:
            return make_response(jsonify({"message":"you are not authorize."}),401)
            

        if not user:
            return make_response(jsonify({"message":"user not found"}),404)

        if current_user.role.name =="admin":            
            if user.role.name !='super_admin':
                user.username = user_data["username"]
                user.email_id = user_data["email"]
                db.session.commit()
                return(make_response(jsonify({"username":user.username,"email":user.email_id})),200)    
            else:
                return make_response(jsonify({"message":"user not found"}),404)
            
        elif current_user.role.name =="super_admin":    
            user_role = UserRole.query.filter(UserRole.name==user_data["role"]).first()  
            if user_role is None:
                return make_response(jsonify({"message":"please enter role admin or user."}),401)
            user.username = user_data["username"]
            user.email_id = user_data["email"]
            user.role_id = user_role.id
            db.session.commit()
            return(make_response(jsonify({"username":user.username,"email":user.email_id,"role":user_role.name})),200)
        
        else:
            
            user.username = user_data["username"]
            user.email_id = user_data["email"]
            db.session.commit()
            return(make_response(jsonify({"username":user.username,"email":user.email_id})),200)
        
@ns.route('/password_change')
class UserPasswordChange(Resource):
    @jwt_required()
    @ns.expect(change_password)
    def put(self):
        '''current_user passord change'''
        user_data = request.get_json()

        if check_password_hash(current_user.password, user_data["old_password"]):
            current_user.password = generate_password_hash(user_data["new_password"],method="sha256")
            db.session.commit()
            return make_response(jsonify({"message":"password change successfully."}),200)
        else:
            return make_response(jsonify({"message":"old_Password doesn't match"}),401)
    

@ns.route('/password_reset')
class UserPasswordReset(Resource):
    @ns.doc(security=[])
    @ns.expect(reset_password)
    def put(self):
        '''password reset'''
        user_data = request.get_json()
        user = User.query.filter_by(email_id = user_data['email']).first()
        if not user:
            return make_response(jsonify({"message":"user not found."}),401)
        
        if user.username != user_data["username"]:
            return make_response(jsonify({"message":"username not match."}),401)
        
        random_password = f'{secrets.SystemRandom().getrandbits(32)}'
        print(random_password)

        user.password = generate_password_hash(random_password,method="sha256")
        

        try:    
            send_password_reset_email(user.email_id,random_password)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"message":f'not able send passsword_reset email, error: {str(e)}'}), 400)
