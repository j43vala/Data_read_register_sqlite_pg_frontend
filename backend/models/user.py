from db import db

class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80),unique=True,nullable=False)
    password = db.Column(db.String,nullable=False)
    email_id = db.Column(db.String(80),nullable=False,unique=True)
    role_id = db.Column(db.Integer,db.ForeignKey("user_role.id"))
    active = db.Column(db.Boolean,default=False)