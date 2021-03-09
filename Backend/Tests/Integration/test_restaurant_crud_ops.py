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


def test_create_staff(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Create/Staff', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'name': 'joe not schmo jr.',
        'email': 'notatest@test.com'
    }, content_type='application/json')

    assert res.status_code == 200


def test_get_all_data(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200
    assert len(json.loads(res.data)['staff']) > 0
    assert len(json.loads(res.data)['tags']) > 0
    assert len(json.loads(res.data)['menu_items']) > 0


def test_descr_update(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Update/Description', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'descr': "Your favorite generic food place!"
    }, content_type='application/json')

    assert res.status_code == 200


def test_create_food(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Create/Food', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'name': 'Generic Food!',
        'price': 4.20,
        'descr': "Your favorite generic food!"
    }, content_type='application/json')

    assert res.status_code == 200


def test_update_food(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Update/Food', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'descr': 'A new Generic great food!',
        'name': 'Generic pizza!',
        'price': 11.99,
        'id': json.loads(res.data)['menu_items'][0]['id']
    }, content_type='application/json')

    assert res.status_code == 200


def test_delete_food(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Delete/Food', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': json.loads(res.data)['menu_items'][0]['id']
    }, content_type='application/json')

    assert res.status_code == 200


def test_add_tag(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Add/Tag', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'tag': 'Sweet'
    }, content_type='application/json')

    assert res.status_code == 200


def test_delete_tag(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Delete/Tag', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': json.loads(res.data)['tags'][0]['id']
    }, content_type='application/json')

    assert res.status_code == 200


def test_update_staff(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Update/Staff', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': json.loads(res.data)['staff'][0]['id'],
        'email': 'notatest@test3.com',
        'name': 'joe schmo sr.'
    }, content_type='application/json')

    assert res.status_code == 200


def test_delete_staff(client):
    # Establish an application context
    res = client.post('/Api/User/Login', json={
        'email': "joblo_@test.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Data', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']}
    }, content_type='application/json')

    assert res.status_code == 200

    res = client.post('/Api/Restaurant/Delete/Staff', json={
        'cookies': {'jwt_token': json.loads(res.data)['jwt_token']},
        'id': json.loads(res.data)['staff'][0]['id'],
    }, content_type='application/json')

    assert res.status_code == 200