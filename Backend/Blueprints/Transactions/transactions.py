from flask import Blueprint, request
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend.Utilities import jwt_tools
import json

transaction_bp = Blueprint('transaction_bp', __name__)

"""
Endpoint expects four parameters
@cookies         Dictionary of client side cookies
@only_active     Boolean to denote if only wanting in progress orders
@offset          Offset for pagination
@limit           Limit number of results returned
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

        orders = session.execute('select * from (select t.stripe_transaction, t.address, mi.name, ol.quantity, t.state, t.id '
                                 'from transaction as t '
                                 '       inner join user on t.user = user.id '
                                 '       left join order_log ol on t.id = ol.transaction '
                                 '       inner join menu_item mi on ol.menu_item = mi.id '
                                 '       inner join (select distinct t.id '
                                 '                   from transaction as t '
                                 '                   where t.restaurant = :restaurant '
                                 '                   limit :limit offset :offset) '
                                 '       as temp_table on temp_table.id = t.id '
                                 'where t.restaurant = :restaurant and t.state < :state) as orders '
                                 'order by orders.id',
                                 {
                                    'restaurant': data['restaurant'],
                                    'limit': parameters['limit'],
                                    'offset': parameters['offset'],
                                    'state': (4 if parameters['only_active'] else 20)
                                 })

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
        print(data)

        session.execute('update transaction '
                        '   set state = state + 1 '
                        'where stripe_transaction = :id and '
                        'restaurant =:restaurant '
                        'and state >= 0',
                        {
                            'id': parameters['id'],
                            'restaurant': data['restaurant']
                        })

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
Endpoint expects four parameters
@cookies         Dictionary of client side cookies
@id              Id of order to retrieve. If empty string will default to bulk retrieval with offset and limit params
@offset          Offset for pagination
@limit           Limit number of results returned
Return json of orders for that user, and jwt_token to refresh browser state
"""


@transaction_bp.route('/Api/User/Transaction/Data', methods=['POST'])
def user_order():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = '{"orders": ['
    prev_order = -1

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        orders = session.execute('select mi.name, ol.quantity, t.state, r.address, u.name, mi.price, r.id, t.stripe_transaction '
                                 'from transaction as t '
                                 '   inner join restaurant r on t.restaurant = r.id '
                                 '   inner join user u on r.id = u.restaurant '
                                 '   left join order_log ol on t.id = ol.transaction '
                                 '   inner join menu_item mi on ol.menu_item = mi.id '
                                 '   inner join (select distinct t.id '
                                 '                   from transaction as t '
                                 '                   where t.user =:user '
                                 '                   limit :limit offset :offset) '
                                 '   as temp_table on temp_table.id = t.id '
                                 'where (:order is not null and t.stripe_transaction = :order) or (t.user =:user and :order is null)',
                                 {
                                    'order': parameters['id'] if len(str(parameters['id'])) > 0 else None,
                                    'user': data['id'],
                                    'limit': parameters['limit'],
                                    'offset': parameters['offset']
                                  })

        for order in orders:
            if prev_order != order[7]:
                prev_order = order[7]

                result += '{"state": "' + str(order[2]) + '",' \
                          '"restaurant_address": "' + str(order[3]) + '", ' \
                          '"restaurant_name": "' + str(order[4]) + '", ' \
                          '"restaurant_id": "' + str(order[6]) + '", ' \
                          '"id": "' + str(order[7]) + '", ' \
                          '"order": ['
            else:
                result = result[:-3] + ','

            result += '{"menu_item": "' + str(order[0]) + '", ' \
                      '"quantity": "' + str(order[1]) + '",' \
                      '"price": "' + str(order[5]) + '"}]},'

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
    print(result)
    return json.loads(result)
