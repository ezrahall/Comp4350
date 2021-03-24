from flask import Blueprint, request
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend.Utilities import jwt_tools
import json

menu_bp = Blueprint('menu_bp', __name__)

"""
Endpoint expects two params. One in url for restaurant and other in body
@cookies   All the cookies from the client as a dictionary
@return json of menu items. 
"""


@menu_bp.route('/Api/Menu/<restaurant>', methods=['POST'])
def restaurant_menu(restaurant):
    Session = sessionmaker(bind=db.engine)
    session = Session()
    token = ''
    result = '{ '

    try:
        parameters = request.json

        menu = session.execute('select r.address, mi.name, mi.price, mi.description, mi.id, r.id, r.comment '
                               'from restaurant as r '
                               '    left join menu_item mi on r.id = mi.restaurant and mi.active = 1 '
                               'where r.active = 1 '
                               'and r.id = :id '
                               'order by mi.name', {'id': restaurant}).fetchall()
        if len(menu) > 0:
            result += '"addr": "' + str(menu[0][0]) + '", ' \
                      '"id": "' + str(menu[0][5]) + '", ' \
                      '"descr": "' + str(menu[0][6]) + '", '\
                      '"menu": ['

            for item in menu:
                result += '{"name": "' + str(item[1]) + '", ' \
                          '"price": "' + str(item[2]) + '", ' \
                          '"description": "' + str(item[3]) + '" ' \
                          '"id": "' + str(item[4]) + '"},'

            if result.endswith(','):
                result = result[:-1]

            result += '], '

        # Endpoint doesnt care if user is logged in or not
        # Checks if token was provided and refreshes it
        if 'jwt_token' in parameters['cookies']:
            token = jwt_tools.encode(jwt_tools.decode(parameters['cookies']))

        result += '"jwt_token": "' + token + '"}'

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)
