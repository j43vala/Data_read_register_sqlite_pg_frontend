from db import db


class UserRole(db.Model):

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, unique=True)

    user = db.relationship('User', backref=db.backref('role'))
