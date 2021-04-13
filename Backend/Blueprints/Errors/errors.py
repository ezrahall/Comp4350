import json

from flask import Blueprint

error_bp = Blueprint('error_bp', __name__)


@error_bp.app_errorhandler(404)
def no_page(error):
    return json.dumps({'success': False, 'error': str(error)}), 404, {'ContentType': 'application/json'}


@error_bp.app_errorhandler(400)
def bad_request(error):
    return json.dumps({'success': False, 'error': str(error)}), 400, {'ContentType': 'application/json'}


@error_bp.app_errorhandler(500)
def server_error(error):
    return json.dumps({'success': False, 'error': str(error)}), 500, {'ContentType': 'application/json'}
