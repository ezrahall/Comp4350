import json

import pytest

from Backend import create_app


@pytest.fixture(scope='module')
def client():
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client  # this is where the testing happens!


def test_get_orders(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Transaction/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'only_active': False,
        'offset': 0,
        'limit': 20
    }, content_type='application/json')

    assert res.status_code == 200
    assert len(json.loads(res.data)['orders']) > 0


def test_order_update(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Transaction/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'only_active': False,
        'offset': 0,
        'limit': 20
    }, content_type='application/json')

    assert res.status_code == 200
    assert len(json.loads(res.data)['orders']) > 0

    res = client.post('/Api/Restaurant/Transaction/Update', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': json.loads(res.data)['orders'][0]['id']
    }, content_type='application/json')

    assert res.status_code == 200


def test_user_order_retrieve(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "TES@gmail.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/User/Transaction/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': '',
        'offset': 0,
        'limit': 20
    }, content_type='application/json')

    assert res.status_code == 200
    assert len(json.loads(res.data)['orders']) > 1
