from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import sessionmaker
from Backend import db
import json

search_bp = Blueprint('search__bp', __name__)


@search_bp.route('/Api/Search', methods=['POST'])
@login_required
def search():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    result = ''

    try:
        res = session.execute('select * from users where org = :org', {'org': current_user.organization})

        session.commit()
    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.loads(result)