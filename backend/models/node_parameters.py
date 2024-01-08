from db import db

class NodeParameter(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    value = db.Column(db.JSON, nullable=False)