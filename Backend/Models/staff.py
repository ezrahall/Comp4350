from flask_login import UserMixin
from Backend import db
from werkzeug.security import generate_password_hash, check_password_hash


class Staff(UserMixin, db.Model):
    __tablename__ = 'staff'

    id = db.Column(db.Integer, primary_key=True)

    restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=False)

    name = db.Column(db.String(100), nullable=False, unique=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=True)

    active = db.Column(db.Boolean, index=False, unique=False, nullable=False)