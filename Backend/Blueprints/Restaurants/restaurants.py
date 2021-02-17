from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import sessionmaker
from Backend import db
import json

restaurant_bp = Blueprint('restaurant_bp', __name__)


@restaurant_bp.route('/Api/Restaurant/Update', methods=['POST'])
@login_required
def restaurant_update():
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


@restaurant_bp.route('/Api/Restaurant/Create/Food', methods=['POST'])
@login_required
def restaurant_create_food():
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


@restaurant_bp.route('/Api/Restaurant/Delete/Food', methods=['POST'])
@login_required
def restaurant_delete_food():
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


@restaurant_bp.route('/Api/Restaurant/Deactivate', methods=['POST'])
@login_required
def restaurant_deactivate():
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