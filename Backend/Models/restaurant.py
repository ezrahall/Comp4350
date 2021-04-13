from flask_login import UserMixin

from Backend import db


class Restaurant(UserMixin, db.Model):
    __tablename__ = 'restaurant'

    id = db.Column(db.Integer, primary_key=True)

    latitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    longitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    address = db.Column(db.String(100), nullable=False, unique=True, index=False)
    comment = db.Column(db.String(10000), nullable=False, unique=False, index=False)

    active = db.Column(db.Boolean, index=True, unique=False, nullable=False)