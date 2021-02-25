from flask_login import UserMixin
from Backend import db


class MenuItem(UserMixin, db.Model):
    __tablename__ = 'menu_item'

    id = db.Column(db.Integer, primary_key=True)

    restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=False)

    name = db.Column(db.String(100), nullable=False, unique=False)
    price = db.Column(db.Float, nullable=False, unique=False, index=True)
    description = db.Column(db.String(2048), index=False, unique=False, nullable=True)
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=False)

    active = db.Column(db.Boolean, index=True, unique=False, nullable=False)
