from flask import Blueprint, request
from werkzeug.security import generate_password_hash
from flask_login import login_required, current_user, logout_user
from sqlalchemy.orm import sessionmaker
from Backend.Models.user import User
from Backend.Models.restaurant import Restaurant
from Backend import db
import json

menu_bp = Blueprint('menu_bp', __name__)


@menu_bp.route('/Api/Menu/<restaurant>', methods=['GET'])
def restaurant_menu(restaurant):
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = '{ '

    try:
        menu = session.execute('', {})

        for item in menu:
            result += ''

        if result.endswith(','):
            result = result[:-1]

        result += '}'

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)
