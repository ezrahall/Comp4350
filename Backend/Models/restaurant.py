from flask_login import UserMixin
from Backend import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'restaurant'

    id = db.Column(db.Integer, primary_key=True)

    tag_0 = db.Column(db.Integer, db.ForeignKey('tags.id'), index=True, nullable=True)
    tag_1 = db.Column(db.Integer, db.ForeignKey('tags.id'), index=True, nullable=True)
    tag_2 = db.Column(db.Integer, db.ForeignKey('tags.id'), index=True, nullable=True)
    tag_3 = db.Column(db.Integer, db.ForeignKey('tags.id'), index=True, nullable=True)

    name = db.Column(db.String(100), nullable=False, unique=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(200), primary_key=False, unique=False, nullable=False)
    latitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    longitude = db.Column(db.Float, nullable=False, unique=False, index=True)
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=True)
    last_login = db.Column(db.DateTime, index=False, unique=False, nullable=True)

    active = db.Column(db.Boolean, index=False, unique=False, nullable=False)