from flask_login import UserMixin
from Backend import db
from werkzeug.security import generate_password_hash, check_password_hash


class Restaurant(UserMixin, db.Model):
    __tablename__ = 'restaurant'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), index=True, nullable=False, unique=False)
    email = db.Column(db.String(40), index=True, unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    latitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    longitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    comment = db.Column(db.String(10000), nullable=False, unique=False, index=False)
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=False)
    last_login = db.Column(db.DateTime, index=False, unique=False, nullable=False)

    active = db.Column(db.Boolean, index=True, unique=False, nullable=False)