from flask_login import UserMixin

from Backend import db


class OrderLog(UserMixin, db.Model):
    __tablename__ = 'order_log'

    id = db.Column(db.Integer, primary_key=True)

    transaction = db.Column(db.Integer, db.ForeignKey('transaction.id'), index=True, nullable=False)
    menu_item = db.Column(db.Integer, db.ForeignKey('menu_item.id'), index=True, nullable=False)

    quantity = db.Column(db.Integer, index=False, nullable=False)
