from flask_login import UserMixin
from Backend import db


class Transaction(UserMixin, db.Model):
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)

    user = db.Column(db.Integer, db.ForeignKey('user.id'), index=True, nullable=False)
    restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=False)

    address = db.Column(db.String(100), nullable=False, unique=True, index=False)
    cost = db.Column(db.Float, index=True, unique=False, nullable=False)
    state = db.Column(db.Integer, index=True, unique=False, nullable=False)

    stripe_transaction = db.Column(db.String(1000), index=True, unique=True, nullable=False)

    created_on = db.Column(db.DateTime, index=True, unique=False, nullable=False)
