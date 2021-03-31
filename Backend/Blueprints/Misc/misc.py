from flask import Blueprint, jsonify, request
from sqlalchemy.orm import sessionmaker
from Backend.Utilities import jwt_tools
from Backend import db
import sys
import stripe
import json

misc_bp = Blueprint('misc_bp', __name__)


@misc_bp.route('/Api/Dump', methods=['POST'])
def webhook():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        if os.environ.get('SAFEAT_ACCEPTANCE_TEST') is not None:
            session.execute('')
        else:
            raise Exception

    except Exception as e:
        # Generic Exception
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(e)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}