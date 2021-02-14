from flask import Blueprint
import json

error_bp = Blueprint('error_bp', __name__)


@error_bp.app_errorhandler(404)
def no_page(e):
    return json.dumps({'success': False}), 404, {'ContentType': 'application/json'}


@error_bp.app_errorhandler(400)
def bad_request(e):
    return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}


@error_bp.app_errorhandler(500)
def server_error(e):
    return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}