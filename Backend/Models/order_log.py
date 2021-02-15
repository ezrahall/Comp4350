from flask_login import UserMixin
from Backend import db
from werkzeug.security import generate_password_hash, check_password_hash


class OrderLog(UserMixin, db.Model):
    __tablename__ = 'order_log'

    id = db.Column(db.Integer, primary_key=True)

    transaction = db.Column(db.Integer, db.ForeignKey('transaction.id'), index=True, nullable=False)
    menu_item = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=False)

    quantity = db.Column(db.Integer, index=False, nullable=False)