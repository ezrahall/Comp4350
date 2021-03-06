from flask import Blueprint, request
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend.Utilities import jwt_tools
import json

transaction_bp = Blueprint('transaction_bp', __name__)

"""
Endpoint expects one parameter
@cookies    Dictionary of client side cookies
Return json of orders for that restaurant
"""


@transaction_bp.route('/Api/Transaction/Data', methods=['POST'])
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
