from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import sessionmaker
from Backend import db
from urllib.parse import parse_qs, urlparse, quote_plus
from Backend.Utilities import jwt_tools
import grequests
import requests
import math
import json
import uuid

search_bp = Blueprint('search__bp', __name__)

"""
Endpoint expects to be given five parameters from client
@dist:     The distance in kilometers the user wishes to search
@query:    The desired restaurant, tag, menu item, etc 
@offset:   The offset for return results for pagination
@limit:    The number of entries you wish to receive
@addr:     The address of the client eg "45 D'arcy Dr. Winnipeg"
Returns JSON array of restaurants with id, name, and description
Default behaviour is empty query which will return first 30 restaurants within range
"""


@search_bp.route('/Api/Search', methods=['POST'])
def search():
    base_endpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='
    all_endpoints = []
    json_string = ''
    rest_map = {}
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])
        """
        This is for testing purposes
        parameters = {
            'addr': '45 D\'arcy Dr, Winnipeg',
            'dist': 50,
            'query': 'salad',
            'offset': 0,
            'limit': 30
        }
        """

        address = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                               quote_plus(parameters['addr']) +
                               '&key=AIzaSyBo-qegIezm3c7-cPJgEyXftnrc5Q4Sa-Y').json()
        # Disables error from mysql for grouping by primary id
        session.execute("set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,"
                        "ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'")

        results = session.execute('select * from (select r.id, u.name, r.comment, r.latitude, r.longitude, r.address '
                                  'from restaurant as r '
                                  '     left join tag_log tl on r.id = tl.restaurant and tl.active = 1 '
                                  '     left join tags t on t.id = tl.tag '
                                  '     left join menu_item mi on r.id = mi.restaurant and mi.active = 1 '
                                  '     inner join user u on r.id = u.restaurant '
                                  'where (u.name like CONCAT("%", :query, "%") or'
                                  '       mi.name like CONCAT("%", :query, "%") or'
                                  '       t.name like CONCAT("%", :query, "%")) '
                                  'and r.active = 1 '
                                  ' and ((ST_Distance_Sphere(point(:lng, :lat), '
                                  '     point(r.longitude, r.latitude))) / 1000) <= :dist '
                                  'order by (ST_Distance_Sphere(point(:lng, :lat), '
                                  '          point(r.longitude, r.latitude)))) '
                                  'as rest_vals '
                                  'group by rest_vals.id limit :limit offset :offset',
                                  {
                                      'dist': parameters['dist'],
                                      'query': parameters['query'],
                                      'offset': parameters['offset'],
                                      'limit': parameters['limit'],
                                      'lat': address['results'][0]['geometry']['location']['lat'],
                                      'lng': address['results'][0]['geometry']['location']['lng']
                                  }).fetchall()

        for row in results:
            all_endpoints.append(base_endpoint +
                                 str(address['results'][0]['geometry']['location']['lat']) + ',' +
                                 str(address['results'][0]['geometry']['location']['lng']) + '&destinations=' +
                                 str(row[3]) + ',' + str(row[4]) +
                                 '&key=AIzaSyBo-qegIezm3c7-cPJgEyXftnrc5Q4Sa-Y')  # build source and dest endpoints

        # taken from https://stackoverflow.com/questions/9110593/asynchronous-requests-with-python-requests
        all_requests = (grequests.get(u) for u in all_endpoints)
        request_results = grequests.map(all_requests)

        for response in request_results:  # iterate through all results of requests
            for row in response.json()['rows']:  # iterate through all travel times for all restaurants
                location = parse_qs(urlparse(response.url).query)['destinations'][0].split(',')
                rest_map[(str(location[0]), str(location[1]))] = \
                    str(math.trunc((int(row['elements'][0]['duration']['value']) + 900) / 60)) + ' Minutes'

        json_string += '{ "restaurants": ['

        for row in results:
            json_string += '{"id": "' + str(row[0]) + '", ' \
                                                      '"name": "' + str(row[1]) + '", ' \
                                                                                  '"description": "' + str(
                row[2]) + '",' \
                          '"delivery_time": "' + rest_map[(str(row[3]), str(row[4]))] + '", ' \
                                                                                        '"address": "' + str(
                row[5]) + '"},'

        if json_string.endswith(','):
            json_string = json_string[:-1]

        json_string += '], "jwt_token": "'+jwt_tools.encode(data)+'"}'

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
    return json.loads(json_string), 200, {'ContentType': 'application/json'}


"""
Endpoint expects at least one parameter from client
@addr:    The address attempting to autocomplete
@token:   The generated token for the api call
If the client doesnt send a token, one will be generated and returned. Client stores token for repeated requests
Returns a json of the token after each query and the results array of predictions
"""


@search_bp.route('/Api/Search/Autocomplete', methods=['POST'])
def location_autocomplete():
    base_endpoint = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBo-qegIezm3c7-cPJgEyXftnrc5Q4Sa-Y'
    json_string = '{ "completions": ['
    enc_jwt = None

    try:
        parameters = request.json
        #data = jwt_tools.decode(parameters['cookies'])

        token = None

        """
        This is for testing purposes
        parameters = {
        'addr': '45 D\'arcy Dr, Winnipeg',
        'token': '81467e77d1b544cda694932995109be3'
        }
        """

        if parameters['token'] is None:
            token = str(uuid.uuid4().hex)
        else:
            token = parameters['token']

        address = requests.get(base_endpoint + '&input=' + quote_plus(parameters['addr']) + '&sessiontoken='
                               + token)

        for completion in address.json()['predictions']:
            json_string += '{"name": "' + completion['description'] + '"},'

        if json_string.endswith(','):
            json_string = json_string[:-1]

        json_string += '], "token": "' + token + '"}'
        #json_string += jwt_tools.encode(data) + '" }'

    except LookupError:
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    return json.loads(json_string)
