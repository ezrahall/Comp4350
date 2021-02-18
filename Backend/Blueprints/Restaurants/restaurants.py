from flask import Blueprint, request
from werkzeug.security import generate_password_hash
from flask_login import login_required, current_user, logout_user
from sqlalchemy.orm import sessionmaker
from Backend.Models.user import User
from Backend.Models.restaurant import Restaurant
from Backend import db
import json

restaurant_bp = Blueprint('restaurant_bp', __name__)


"""
Endpoint expects no parameters
Return json of associated restaurant information of menu items, tags, description, etc
"""


@restaurant_bp.route('/Api/Restaurant/Data', methods=['GET'])
@login_required
def restaurant_data():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        session.execute('', {})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)


"""
Endpoint expects one parameter
@descr:    The description of the restaurant, which is to be displayed on the menu and search page
If value is empty than it will not be updated
"""


@restaurant_bp.route('/Api/Restaurant/Update', methods=['POST'])
@login_required
def restaurant_update():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        parameters = json.loads(request.form['send_data'])
        # Update description of restaurant
        if parameters['descr'] != "" and current_user.restaurant is not None:
            session.query(Restaurant).filter(Restaurant.id == current_user.restaurant).update(
                {'comment': parameters['descr']})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@restaurant_bp.route('/Api/Restaurant/Create/Food', methods=['POST'])
@login_required
def restaurant_create_food():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        session.execute('', {})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)


@restaurant_bp.route('/Api/Restaurant/Delete/Food', methods=['POST'])
@login_required
def restaurant_delete_food():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        session.execute('', {})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)


@restaurant_bp.route('/Api/Restaurant/Create/Tag', methods=['POST'])
@login_required
def restaurant_add_tag():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        session.execute('', {})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)


@restaurant_bp.route('/Api/Restaurant/Delete/Tag', methods=['POST'])
@login_required
def restaurant_delete_tag():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        session.execute('', {})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)
