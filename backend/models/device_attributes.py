from db import db 


class Attribute(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    value = db.Column(db.String, nullable=False)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'))
    