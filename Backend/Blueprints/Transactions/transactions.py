from flask import Blueprint, request
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend.Utilities import jwt_tools
import json

transaction_bp = Blueprint('transaction_bp', __name__)

"""
Endpoint expects one parameter
@cookies    Dictionary of client side cookies
Return json of orders for that restaurant, and jwt_token to refresh browser state
"""


@transaction_bp.route('/Api/Restaurant/Transaction/Data', methods=['POST'])
def all_orders():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    prev_order = -1
    result = '{ "orders": ['

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        orders = session.execute('select * from (select t.id, t.address, mi.name, ol.quantity, t.state '
                                 'from transaction as t '
                                 '       inner join user on t.user = user.id '
                                 '       left join order_log ol on t.id = ol.transaction '
                                 '       inner join menu_item mi on ol.menu_item = mi.id '
                                 'where t.restaurant = :id and t.state < 4) as orders '
                                 'order by orders.id', {'id': data['restaurant']})

        for order in orders:
            if prev_order != order[0]:
                prev_order = order[0]

                result += '{"id": "' + str(order[0]) + '", ' \
                           '"address": "' + str(order[1]) + '", ' \
                           '"state": "' + str(order[4]) + '", ' \
                           '"order": ['
            else:
                result = result[:-3] + ','

            result += '{"menu_item": "' + str(order[2]) + '", ' \
                       '"quantity": "' + str(order[3]) + '"}]},'

        if result.endswith(','):
            result = result[:-1]

        result += '], "jwt_token": "' + jwt_tools.encode(data) + '"}'

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)


"""
Endpoint expects two parameters
@cookies    Dictionary of client side cookies
@id         Id of order to update the current stage
Return jwt_token to refresh browser session
"""


@transaction_bp.route('/Api/Restaurant/Transaction/Update', methods=['POST'])
def update_order_state():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('update transaction '
                        '   set state = state + 1 '
                        'where id = :id and '
                        'restaurant =:restaurant',
                        {'id': parameters['id'],
                         'restaurant': data['restaurant']})

        result += '{"jwt_token": "' + jwt_tools.encode(data) + '"}'

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)


"""
Endpoint expects two parameters
@cookies    Dictionary of client side cookies
@id         Id of order to query
Return jwt_token to refresh browser session
"""


@transaction_bp.route('/Api/User/Transaction/Get', methods=['POST'])
def user_order():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = '{'

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        order = session.execute('select mi.name, ol.quantity, t.state, r.address, u.name, mi.price, r.id '
                                'from transaction as t '
                                '   inner join restaurant r on t.restaurant = r.id '
                                '   inner join user u on r.id = u.restaurant '
                                '   left join order_log ol on t.id = ol.transaction '
                                '   inner join menu_item mi on ol.menu_item = mi.id '
                                'where t.id = :order and t.user = :user',
                                {'order': parameters['id'],
                                 'user': data['id']}).fetchall()

        if len(order) > 0:
            result += '"state": "' + str(order[0][2]) +'",' \
                      '"restaurant_address": "' + str(order[0][3]) + '", ' \
                      '"restaurant_name": "' + str(order[0][4]) + '", ' \
                      '"restaurant_id": "' + str(order[0][6]) + '", ' \
                      '"order": ['

        for food in order:
            result += '{"menu_item": "' + str(food[0]) + '", ' \
                       '"quantity": "' + str(food[1]) + '",' \
                       '"price": "' + str(food[5]) + '"},'

        if result.endswith(','):
            result = result[:-1] + '], '

        result += '"jwt_token": "' + jwt_tools.encode(data) + '"}'

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)



