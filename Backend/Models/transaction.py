from flask_login import UserMixin
from Backend import db
from werkzeug.security import generate_password_hash, check_password_hash


class Transaction(UserMixin, db.Model):
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)

    user = db.Column(db.Integer, db.ForeignKey('user.id'), index=True, nullable=False)
    restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=False)

    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=True)
