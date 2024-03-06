from db import db
from models import UserRole,User
from werkzeug.security import generate_password_hash, check_password_hash


def check_and_add_user_role():
    role_name_list = ["super_admin","admin","user"]
    for role_name in role_name_list:
        user_role = UserRole.query.filter(UserRole.name==role_name).first()
        if user_role:
            pass
        else:
            new_user_role = UserRole(name=role_name)
            db.session.add(new_user_role)
    db.session.commit()
    
def check_and_add_super_admin():
    name = "user 1"
    user = User.query.filter(User.username==name).first()
    if user:
        pass
    else:
        email = "admin123@gmail.com"
        password = input(str("enter password"))
        user_role = UserRole.query.filter(UserRole.name=="super_admin").first()
        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=name,email_id=email,password=hashed_password,role_id=user_role.id)
        db.session.add(new_user)
        db.session.commit()
