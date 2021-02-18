from flask_login import UserMixin
from Backend import db


class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)

    restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=True)

    name = db.Column(db.String(100), nullable=False, unique=False)
    email = db.Column(db.String(40), index=True, unique=True, nullable=False)
    phone = db.Column(db.String(20), index=False, unique=False, nullable=True)
    password = db.Column(db.String(200), unique=False, nullable=False)
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=False)
    last_login = db.Column(db.DateTime, index=False, unique=False, nullable=False)

    active = db.Column(db.Boolean, index=True, unique=False, nullable=False)

