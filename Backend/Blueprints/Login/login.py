from flask import Blueprint, request
from flask_login import login_required, logout_user, login_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend import login_manager
from Backend.Models.user import User
from urllib.parse import quote_plus
import requests
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
    Session = sessionmaker(bind=db.engine)
    session = Session()
    user = None
    
    try:
        # Check to see if credentials match user, and the account is still active
        print("In try")
        user = User.query.filter(User.active == 1, User.email == request.form['email']).first()
        print("Got user ")
        print(user)
        if user.check_password(request.args.get('password')):
            login_user(user)
            session.execute('update user set last_login = now() where id = :id and active = 1',
                            {'id': user.id})
        else:
            # No account matched the supplied credentials
            raise LookupError

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
    return user.to_json(), 200, {'ContentType': 'application/json'}


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
    Session = sessionmaker(bind=db.engine)
    session = Session()
    user = None

    try:
        # Check to see if email is already in use
        print("in try")
        print(request.form['email'])
        print("trying first query")
        in_use_email = User.query.filter(User.active == 1, User.email == request.form['email']).first()
        print(in_use_email)
        # If account exists then we raise exception
        if in_use_email is not None:
            raise LookupError

        # Else wise we now create the new user
        session.execute('insert into user values(default, null, :name, :email, "", :password, now(), now(), 1)',
                        {
                            'name': request.form['name'],
                            'email': request.form['email'],
                            'password': generate_password_hash(request.form['password'], method='pbkdf2:sha256',
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
    Session = sessionmaker(bind=db.engine)
    session = Session()
    user = None

    try:
        # Check to see if restaurant/user exists in the system
        in_use_email = User.query.filter(User.email == request.form['email'], User.active == 1).first()
        # Raise an error if they already are present
        if in_use_email is not None:
            raise LookupError

        # Make a request to google for latitude and longitude of restaurant
        address = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                               quote_plus(request.form['addr']) +
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
                            'name': request.form['name'],
                            'email': request.form['email'],
                            'password': generate_password_hash(request.form['password'], method='pbkdf2:sha256',
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


"""
Endpoint for logging out the user from the application
"""


@login_bp.route("/Api/Logout", methods=['GET'])
@login_required
def logout():
    logout_user()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


"""
Utility checks on every request that has the @login_required command that the use is actually logged in
"""


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id, active=1).first()


"""
Utility handles the case that user has logged out and then attempted to access account information
"""


@login_manager.unauthorized_handler
def unauthorized():
    return json.dumps({'success': False}), 403, {'ContentType': 'application/json'}
