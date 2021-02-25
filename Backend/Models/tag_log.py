from flask_login import UserMixin
from Backend import db


class TagLog(UserMixin, db.Model):
    __tablename__ = 'tag_log'

    id = db.Column(db.Integer, primary_key=True)

    restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), index=True, nullable=False)
    tag = db.Column(db.Integer, db.ForeignKey('tags.id'), index=True, nullable=False)
    created_on = db.Column(db.DateTime, index=True, unique=False, nullable=False)

    active = db.Column(db.Boolean, index=True, unique=False, nullable=False)