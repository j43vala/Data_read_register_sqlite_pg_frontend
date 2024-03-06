from sqlalchemy.sql import func
from db import db


class BlacklistToken(db.Model):

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    jti = db.Column(db.String(36))

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())