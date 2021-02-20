from flask import Blueprint, request, send_from_directory
from flask_login import login_required, current_user, logout_user
from sqlalchemy.orm import sessionmaker
from Backend.Models.user import User
from Backend.Models.restaurant import Restaurant
from werkzeug.utils import secure_filename
from Backend import db
from PIL import Image
import os
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
    result = '{}'

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
@login_required
def upload_image():
    # Check if current user is a restaurant owner and is therefore capable of uploading images
    if current_user.restaurant is not None:
        file = request.files['file']

        try:
            # Save the file to disk initially
            file.save(os.path.join(os.getcwd() + '/Backend/Images/', str(current_user.restaurant)))
            # Reopen file and convert to proper image format to save bandwidth for client
            image = Image.open(os.path.join(os.getcwd() + '/Backend/Images/', str(current_user.restaurant))).convert('RGB')
            image.save(os.path.join(os.getcwd() + '/Backend/Images/', str(current_user.restaurant) + '.jpg'), optimize=True)
            # Delete old image from disk as we no longer need it
            os.remove(os.path.join(os.getcwd() + '/Backend/Images/', str(current_user.restaurant)))
        except Exception as e:
            print(str(e))
            return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


"""
Endpoint deletes image from server, expects no parameters
Uses current session information to delete image
"""


@restaurant_bp.route('/Api/Images/Delete', methods=['GET'])
@login_required
def delete_image():
    try:
        # As all images are saved as .jpg format we can blindly delete based on user restaurant
        os.remove(os.path.join(os.getcwd(), '/Backend/Images/' + str(current_user.restaurant)) + '.jpg')
    except Exception as e:
        print(str(e))
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
