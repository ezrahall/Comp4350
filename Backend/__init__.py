from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()
login_manager = LoginManager()


def create_app():
    appl = Flask(__name__, static_folder=os.path.abspath(''))
    appl.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user_1:&Q?kXvA7XQ@159.203.34.38:3306/safeat'
    appl.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    appl.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024

    db.init_app(appl)
    login_manager.init_app(appl)

    with appl.app_context():
        from Backend.Blueprints.Errors import errors
        from Backend.Blueprints.Login import login
        from Backend.Blueprints.Restaurants import restaurants
        from Backend.Blueprints.Search import search
        from Backend.Blueprints.Users import users
        from Backend.Blueprints.Utilities import utility

        appl.register_blueprint(errors.error_bp)
        appl.register_blueprint(login.login_bp)
        appl.register_blueprint(restaurants.restaurant_bp)
        appl.register_blueprint(search.search_bp)
        appl.register_blueprint(users.users_bp)

        return appl


create_app()