import json
import os

from PIL import Image
from flask import Blueprint, request, send_from_directory
from sqlalchemy.orm import sessionmaker

from Backend import db
from Backend.Models.menu_item import MenuItem
from Backend.Models.restaurant import Restaurant
from Backend.Models.staff import Staff
from Backend.Utilities import jwt_tools

restaurant_bp = Blueprint('restaurant_bp', __name__)

"""
Endpoint expects one parameter
@cookies       A dictionary of cookies from the client browser
Return json of associated restaurant information of staff, jwt_token
"""


@restaurant_bp.route('/Api/Restaurant/Staff/Data', methods=['POST'])
def restaurant_get_staff_data():
    session = sessionmaker(bind=db.engine)()
    staff = '"staff": ['

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        restaurant_data = session.execute('select st.id, st.name, st.email '
                                          'from staff as st '
                                          'where st.active = 1 '
                                          'and st.restaurant = :restaurant ',
                                          {'restaurant': data['restaurant']})

        for item in restaurant_data:
            staff += '{"id": "' + str(item[0]) + '", ' \
                      '"name": "' + str(item[1]) + '", ' \
                      '"email": "' + str(item[2]) + '"},'

        if staff.endswith(','):
            staff = staff[:-1]

        staff += '], '

        jwt_token = '"jwt_token": "' + jwt_tools.encode(data) + '"'

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads('{' + staff + jwt_token + '}')



"""
Endpoint expects one parameter
@cookies       A dictionary of cookies from the client browser
Return json of associated restaurant information of  tags, and jwt_token
"""


@restaurant_bp.route('/Api/Restaurant/Tag/Data', methods=['POST'])
def restaurant_get_tag_data():
    session = sessionmaker(bind=db.engine)()
    tags = '"tags": ['

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        restaurant_data = session.execute('select t.id, t.name '
                                          'from tag_log as tl '
                                          '   inner join tags t on tl.tag = t.id and tl.restaurant =:restaurant '
                                          'where tl.active = 1',
                                          {'restaurant': data['restaurant']})

        for item in restaurant_data:
            tags += '{"id": "' + str(item[0]) + '", ' \
                     '"name": "' + str(item[1]) + '"},'

        if tags.endswith(','):
            tags = tags[:-1]

        tags += '], '

        jwt_token = '"jwt_token": "' + jwt_tools.encode(data) + '"'

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads('{' + tags + jwt_token + '}')


"""
Endpoint expects one parameter
@cookies       A dictionary of cookies from the client browser
Return json of associated restaurant information of menu items and jwt_token
"""


@restaurant_bp.route('/Api/Restaurant/Menu/Data', methods=['POST'])
def restaurant_get_menu_data():
    session = sessionmaker(bind=db.engine)()
    menu = '"menu_items": ['

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        restaurant_data = session.execute('select mi.id, mi.name, mi.price, mi.description '
                                          'from menu_item as mi '
                                          'where mi.active = 1 and '
                                          'mi.restaurant =:restaurant',
                                          {'restaurant': data['restaurant']})

        for item in restaurant_data:
            menu += '{"id": "' + str(item[0]) + '", ' \
                     '"name": "' + str(item[1]) + '", ' \
                     '"price": "' + str(item[2]) + '", ' \
                     '"description": "' + str(item[3]) + '"},'

        if menu.endswith(','):
            menu = menu[:-1]

        menu += '], '

        jwt_token = '"jwt_token": "' + jwt_tools.encode(data) + '"'

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads('{' + menu + jwt_token + '}')


"""
Endpoint expects two parameters
@cookies:  A dictionary of cookies from the client
@descr:    The description of the restaurant, which is to be displayed on the menu and search page
If value is empty than it will not be updated
Returns jwt_token to client
"""


@restaurant_bp.route('/Api/Restaurant/Update/Description', methods=['POST'])
def restaurant_update():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        # Update description of restaurant
        if parameters['descr'] != "" and data['restaurant'] is not None:
            session.query(Restaurant).filter(Restaurant.id == data['restaurant']).update(
                {'comment': parameters['descr']})

        jwt_token = jwt_tools.encode(data)

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects four parameters
@cookies   A dictionary of cookies from the client
@name      The name of the food item
@price     The price of the food item
@descr     A small description of the food item
Returns jwt_token to client
"""


@restaurant_bp.route('/Api/Restaurant/Create/Food', methods=['POST'])
def restaurant_create_food():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('insert into menu_item values(default, :restaurant, :name, :price, :description, now(), 1)',
                        {
                            'restaurant': data['restaurant'],
                            'name': parameters['name'],
                            'price': parameters['price'],
                            'description': parameters['descr']
                        })

        food_id = session.execute('select last_insert_id()').fetchall()[0][0]

        jwt_token = jwt_tools.encode(data)

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token, 'id': food_id}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects two parameters from client
@cookies    A dictionary of cookies from the client browser
@id         The id of the food to be deleted
"""


@restaurant_bp.route('/Api/Restaurant/Delete/Food', methods=['POST'])
def restaurant_delete_food():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('update menu_item set active = 0 where id =:food and restaurant =:restaurant',
                        {
                            'restaurant': data['restaurant'],
                            'food': parameters['id']
                        })

        jwt_token = jwt_tools.encode(data)

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects 4 parameters
@cookies:       A dictionary of cookies from client browser
@descr:         New description for food
@name:          New name for food
@price:         New price for food
If given empty string for parameter it will not update that field
return jwt_token back to client
"""


@restaurant_bp.route('/Api/Restaurant/Update/Food', methods=['POST'])
def restaurant_update_food():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        # Update description of restaurant
        if data['restaurant'] is not None:
            if parameters['descr'] != "":
                session.query(MenuItem).filter(
                    MenuItem.id == parameters['id'],
                    MenuItem.restaurant == data['restaurant']
                ).update({'description': parameters['descr']})

            if parameters['name'] != "":
                session.query(MenuItem).filter(
                    MenuItem.id == parameters['id'],
                    MenuItem.restaurant == data['restaurant']
                ).update({'name': parameters['name']})

            if parameters['price'] != "":
                session.query(MenuItem).filter(
                    MenuItem.id == parameters['id'],
                    MenuItem.restaurant == data['restaurant']
                ).update({'price': parameters['price']})

        jwt_token = jwt_tools.encode(data)

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects two parameters
@cookies:       A dictionary of cookies from client
@tag:           The english word of the desired tag. ie "Sweet"
returns new jwt_token back to client
"""


@restaurant_bp.route('/Api/Restaurant/Create/Tag', methods=['POST'])
def restaurant_add_tag():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('insert into tag_log values(default, :restaurant, '
                        '(select tags.id from tags where name = :tag),'
                        ' now(), 1)',
                        {
                            'restaurant': data['restaurant'],
                            'tag': parameters['tag'],
                        })

        tag_id = session.execute('select last_insert_id()').fetchall()[0][0]

        jwt_token = jwt_tools.encode(data)

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token, 'id': tag_id}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects two parameters
@cookies:      Dictionary of cookies from client
@id:           The id of the tag to delete
returns new jwt_token
"""


@restaurant_bp.route('/Api/Restaurant/Delete/Tag', methods=['POST'])
def restaurant_delete_tag():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('delete from tag_log where restaurant = :restaurant and tag =:tag',
                        {
                            'restaurant': data['restaurant'],
                            'tag': parameters['id'],
                        })

        jwt_token = jwt_tools.encode(data)

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects three parameters
@cookies:    Dictionary of cookies from client
@name:       Name of staff member
@email:      Email of staff member
"""


@restaurant_bp.route('/Api/Restaurant/Create/Staff', methods=['POST'])
def restaurant_create_staff():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('insert into staff values(default, :restaurant, :name, :email, now(), 1)',
                        {
                            'restaurant': data['restaurant'],
                            'name': parameters['name'],
                            'email': parameters['email']
                        })

        staff_id = session.execute('select last_insert_id()').fetchall()[0][0]

        jwt_token = jwt_tools.encode(data)

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token, 'id': staff_id}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects three parameters
@cookies:    A dictionary of cookies from client
@name:       New name of staff
@email:      New email of staff
If parameter is empty string the field will not be updated
return new jwt_token to client
"""


@restaurant_bp.route('/Api/Restaurant/Update/Staff', methods=['POST'])
def restaurant_update_staff():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        # Update description of restaurant
        if data['restaurant'] is not None:
            if parameters['name'] != "":
                session.query(Staff).filter(
                    Staff.id == parameters['id'],
                    Staff.restaurant == data['restaurant']
                ).update({'name': parameters['name']})

            if parameters['email'] != "":
                session.query(Staff).filter(
                    Staff.id == parameters['id'],
                    Staff.restaurant == data['restaurant']
                ).update({'email': parameters['email']})

        jwt_token = jwt_tools.encode(data)

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects at least two parameters
@cookies:        A dictionary of cookies from client
@id:             Id of staff member to delete
returns new jwt_token on success
"""


@restaurant_bp.route('/Api/Restaurant/Delete/Staff', methods=['POST'])
def restaurant_delete_staff():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        session.execute('delete from staff where id =:staff and restaurant =:restaurant',
                        {
                            'restaurant': data['restaurant'],
                            'staff': parameters['id']
                        })

        jwt_token = jwt_tools.encode(data)

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint expects only one param encoded in the url as an integer
This value is then used to retrieve the image from the backend 
"""


@restaurant_bp.route('/Api/Images/<image_id>')
def get_image(image_id):
    if os.path.exists(os.path.join(os.getcwd() + '/Backend/Images/') + str(image_id) + '.jpg'):
        return send_from_directory(directory=os.path.join(os.getcwd() + '/Backend/Images/'),
                                   filename=str(image_id) + '.jpg')
    else:
        return send_from_directory(directory=os.path.join(os.getcwd() + '/Backend/Images/'),
                                   filename='no_image.jpg')


"""
Endpoint expects no parameters other than the image file
Saves file, then opens it and converts it to jpg format
"""


@restaurant_bp.route('/Api/Images/Upload', methods=['POST'])
def upload_image():
    # Check if current user is a restaurant owner and is therefore capable of uploading images
    jwt_token = None

    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])

        file = request.files['file']
        # Save the file to disk initially
        file.save(os.path.join(os.getcwd() + '/Backend/Images/', str(data['restaurant'])))
        # Reopen file and convert to proper image format to save bandwidth for client
        image = Image.open(os.path.join(os.getcwd() + '/Backend/Images/', str(data['restaurant']))).convert('RGB')
        image.save(os.path.join(os.getcwd() + '/Backend/Images/', str(data['restaurant']) + '.jpg'), optimize=True)
        # Delete old image from disk as we no longer need it
        os.remove(os.path.join(os.getcwd() + '/Backend/Images/', str(data['restaurant'])))
        # Generate new jwt token
        jwt_token = jwt_tools.encode(data)

    except LookupError:
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as error:
        return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}

    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Endpoint deletes image from server, expects no parameters
Uses current session information to delete image
"""


@restaurant_bp.route('/Api/Images/Delete', methods=['POST'])
def delete_image():
    try:
        parameters = request.json
        data = jwt_tools.decode(parameters['cookies'])
        # As all images are saved as .jpg format we can blindly delete based on user restaurant
        os.remove(os.path.join(os.getcwd(), '/Backend/Images/' + str(data['restaurant'])) + '.jpg')
        # Generate new token
        jwt_token = jwt_tools.encode(data)
    except LookupError:
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception:
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}
