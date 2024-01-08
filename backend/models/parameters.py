from db import db

class Parameter(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    active = db.Column(db.Boolean, default=True)
    function_code = db.Column(db.String, nullable=False)
    address = db.Column(db.Integer, nullable=False)
    parameter_name = db.Column(db.String)
    data_type = db.Column(db.String)
    threshold =db.Column(db.Float)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'))
    