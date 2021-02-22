from flask import Blueprint, request
from flask_login import login_required, current_user, logout_user
from werkzeug.security import generate_password_hash
from sqlalchemy.orm import sessionmaker
from Backend.Models.user import User
from Backend import db
import json

users_bp = Blueprint('users__bp', __name__)

"""
Endpoint expects to be fed an object with four parameters
@name:        The name of the user or restaurant
@email:       The email of the user or restaurant
@password:    The password of the user or restaurant
@phone:       The phone num of the user or restaurant
If the field is an empty string than it will not be updated
"""


@users_bp.route('/Api/User/Update', methods=['POST'])
@login_required
def user_update():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        parameters = request.json

        # Update users name
        if parameters['name'] != "":
            session.query(User).filter(User.id == current_user.id).update({'name': parameters['name']})
        # Update email
        if parameters['email'] != "":
            session.query(User).filter(User.id == current_user.id).update({'email': parameters['email']})
        # Update password
        if parameters['password'] != "":
            session.query(User).filter(User.id == current_user.id).update(
                {'password': generate_password_hash(parameters['password'])})
        # Update phone
        if parameters['phone'] != "":
            session.query(User).filter(User.id == current_user.id).update({'phone': parameters['phone']})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects no parameters
Endpoint will deactivate user or restaurant if requested. Will also log them out upon completion
"""


@users_bp.route('/Api/User/Deactivate', methods=['GET'])
@login_required
def user_deactivate():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        session.execute('update user set active = 0 where id = :id', {'id': current_user.id})

        if current_user.restaurant is not None:
            session.execute('update restaurant set active = 0 where id = :id', {'id': current_user.restaurant})

        logout_user()

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}