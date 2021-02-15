from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import sessionmaker
from Backend import db
import json

search_bp = Blueprint('search__bp', __name__)

"""
Endpoint expects to be given four parameters from client
@dist:   The distance in kilometers the user wishes to search
@query:  The desired restaurant, tag, menu item, etc 
@offset: The offset for return results for pagination
@limit:  The number of entries you wish to receive
Returns JSON array of restaurants with id, name, and description
Default behaviour is empty query which will return first 30 restaurants within range
"""


@search_bp.route('/Api/Search', methods=['POST'])
def search():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    json_string = ''

    try:
        parameters = json.loads(request.form['send_data'])

        results = session.execute('select * from (select r.id, r.name, r.comment '
                                  'from restaurant as r '
                                  '     left join tag_log tl on r.id = tl.restaurant and tl.active = 1 '
                                  '     left join tags t on t.id = tl.tag '
                                  '     left join menu_item mi on r.id = mi.restaurant and mi.active = 1 '
                                  'where (r.name like CONCAT("%", :query, "%") or'
                                  '       mi.name like CONCAT("%", :query, "%") or'
                                  '       t.name like CONCAT("%", :query, "%")) '
                                  'and r.active = 1 '
                                  ' and ((ST_Distance_Sphere(point((select u.longitude from user as u '
                                  '     where u.active = 1 and u.id = :id), '
                                  '     (select u.latitude from user as u '
                                  '     where u.active = 1 and u.id = :id)), '
                                  '     point(r.longitude, r.latitude))) / 1000) <= :dist '
                                  'order by (ST_Distance_Sphere(point((select u.longitude from user as u '
                                  '     where u.active = 1 and u.id = :id), '
                                  '     (select u.latitude from user as u '
                                  '     where u.active = 1 and u.id = :id)), '
                                  '     point(r.longitude, r.latitude)))) '
                                  'as rest_vals '
                                  'group by rest_vals.id limit :limit offset :offset',
                                  {
                                      'id': current_user.id,
                                      'dist': parameters['dist'],
                                      'query': parameters['query'],
                                      'offset': parameters['offset'],
                                      'limit': parameters['limit']
                                  })

        json_string += '{ "restaurants": ['

        for row in results:
            json_string += '{"id": "' + str(row[0]) + '", ' \
                            '"name": "' + str(row[1]) + '", ' \
                            '"description": "' + str(row[2]) + '"},'

        if json_string.endswith(','):
            json_string = json_string[:-1]

        json_string += ']}'
    except Exception as e:
        print(str(e))
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(json_string)
