import pytest
from Backend import create_app
import json


@pytest.fixture(scope='module')
def client():
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client  # this is where the testing happens!


def test_create_session(client):
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Payment', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'basket': [{'id': 4, 'qty': 1, 'price': '2.99'}],
        'addr': '45 D\'arcy Dr. Winnipeg MB',
        'restaurant': 4
    }, content_type='application/json')

    assert res.status_code == 200
    assert json.loads(res.data)['id'] != ''

    global session_id
    session_id = json.loads(res.data)['id']


def test_retrieve_session(client):
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Payment/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': session_id
    }, content_type='application/json')

    assert res.status_code == 200
    assert json.loads(res.data)['id'] != ''


def test_webhook(client):
    res = client.post('/Api/Restaurant/Payment/Webhook', json={
        'email': "joblo_@test.com",
        'id': session_id
    }, content_type='application/json')

    assert res.status_code == 200
