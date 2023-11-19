from db import db

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    active = db.Column(db.Boolean, default=True)
    name = db.Column(db.String, unique=True)
    slave_id = db.Column(db.Integer)

    # Add a one-to-many relationship to parameters
    parameters = db.relationship('Parameter', backref='device', lazy=True)
    
    # Fix the relationship definition to DeviceAttribute
    attributes = db.relationship('Attribute', backref='device', lazy=True)