from flask_login import UserMixin
from Backend import db
from werkzeug.security import generate_password_hash, check_password_hash


class Restaurant(UserMixin, db.Model):
    __tablename__ = 'restaurant'

    id = db.Column(db.Integer, primary_key=True)

    latitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    longitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    comment = db.Column(db.String(10000), nullable=False, unique=False, index=False)

    active = db.Column(db.Boolean, index=True, unique=False, nullable=False)