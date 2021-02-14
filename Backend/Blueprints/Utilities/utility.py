from flask import redirect
from Backend import login_manager
from Backend.Models.user import User


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id, active=1).first()


@login_manager.unauthorized_handler
def unauthorized():
    return redirect("https://Safeat")