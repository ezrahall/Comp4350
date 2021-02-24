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


def test_user_update(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "TES@gmail.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/User/Update', json={
        'email': "",
        'password': "test",
        'name': "",
        'phone': "434534 666",
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200


def test_rest_update(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Update', json={
        'descr': "Come eat our terrible food!",
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

