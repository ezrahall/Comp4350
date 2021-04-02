from flask import Blueprint, request
from werkzeug.security import generate_password_hash
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend.Models.user import User
from urllib.parse import quote_plus
import requests
from Backend.Utilities import jwt_tools
import json

login_bp = Blueprint('login_bp', __name__)

"""
Endpoint for users to login with the application, expects two parameters
@email:       The email of the user, which will become its username
@password:    The password for the user. It is converted to Sha256 for security purposes
If doesnt match exactly to any account an error will be raised, and passed to the client. This is arguably the most
secure we can be, as we dont reveal any information other than it wasn't a perfect match to an account. Brute forcing
this and getting the email or password wrong or an email that doesnt exist all give the same error.

"""


@login_bp.route('/Api/User/Login', methods=['POST'])
def user_login():
    # Initialize the database connection
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        # Check to see if credentials match user, and the account is still active
        user = User.query.filter(User.active == 1, User.email == parameters['email']).first()

        if user is not None and user.check_password(parameters['password']):
            enc_jwt = jwt_tools.encode({'id': user.id, 'restaurant': user.restaurant})
            session.execute('update user set last_login = now() where id = :id and active = 1', {'id': user.id})
        else:
            # No account matched the supplied credentials
            raise LookupError

        response = user.to_json()[:-1] + ', "jwt_token": "' + enc_jwt + '"}'
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Username or password is incorrect'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return response, 200, {'ContentType': 'application/json'}


"""
Endpoint for users to register with the application, expects three parameters
@name:        The name of the user to put into the system
@email:       The email of the user, which will become its username
@password:    The password for the user. It is converted to Sha256 for security purposes
If email already exists in the system an error will be raised, and passed to the client. This technically is not 
secure as an adversary can brute force this to find emails registered to then attack. Although the only alternative
is to silently fail which is telling the adversary the same information, and potential users would get frustrated.

"""


@login_bp.route('/Api/User/Register', methods=['POST'])
def user_register():
    # Initialize database
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        # Check to see if email is already in use
        in_use_email = User.query.filter(User.active == 1, User.email == parameters['email']).first()

        # If account exists then we raise exception
        if in_use_email is not None:
            raise LookupError

        # Else wise we now create the new user
        session.execute('insert into user values(default, null, :name, :email, "", :password, now(), now(), 1)',
                        {
                            'name': parameters['name'],
                            'email': parameters['email'],
                            'password': generate_password_hash(parameters['password'], method='pbkdf2:sha256',
                                                               salt_length=8)
                        })

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'An account with this name already exists.'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


"""
Endpoint for restaurants to register with the application, expects three parameters
@name:        The name of the restaurant to put into the system
@email:       The email of the restaurant, which will become its username
@password:    The password for the account. It is converted to Sha256 for security purposes
@addr:        The location of the restaurant as an address
If email already exists in the system an error will be raised, and passed to the client. This technically is not 
secure as an adversary can brute force this to find emails registered to then attack. Although the only alternative
is to silently fail which is telling the adversary the same information, and potential users would get frustrated.

"""


@login_bp.route('/Api/Restaurant/Register', methods=['POST'])
def restaurant_register():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        # Check to see if restaurant/user exists in the system
        in_use_email = User.query.filter(User.email == parameters['email'], User.active == 1).first()
        # Raise an error if they already are present
        if in_use_email is not None:
            raise LookupError

        # Make a request to google for latitude and longitude of restaurant
        address = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                               quote_plus(parameters['addr']) +
                               '&key=AIzaSyBo-qegIezm3c7-cPJgEyXftnrc5Q4Sa-Y').json()
        # Insert restaurant into system
        session.execute('insert into restaurant values(default, :lat, :lng, :addr, "", 1)',
                        {
                            'lat': address['results'][0]['geometry']['location']['lat'],
                            'lng': address['results'][0]['geometry']['location']['lng'],
                            'addr': address['results'][0]['formatted_address']
                        })
        # Create user and link them to that restaurant
        session.execute('insert into user values(default, last_insert_id(), :name, :email, "", :password, '
                        'now(), now(), 1)',
                        {
                            'name': parameters['name'],
                            'email': parameters['email'],
                            'password': generate_password_hash(parameters['password'], method='pbkdf2:sha256',
                                                               salt_length=8)
                        })

        session.commit()
    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'An account with this email already exists.'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
