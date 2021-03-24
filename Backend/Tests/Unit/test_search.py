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


def test_search(client):
    # Establish an application context
    res = client.post('/Api/Search', json={
        'dist': 50,
        'query': "",
        'offset': 0,
        'limit': 2,
        'addr': '45 D\'arcy Dr. Winnipeg MB',
        'cookies': ''
    }, content_type='application/json')

    assert res.status_code == 200
    assert len(json.loads(res.data)['restaurants']) > 0


def test_autocomplete(client):
    # Establish an application context
    res = client.post('/Api/Search/Autocomplete', json={
        'token': "",
        'addr': "45 D'arcy Dr. Winnipeg"
    }, content_type='application/json')

    assert res.status_code == 200
    assert json.loads(res.data)['token'] != ""
    assert len(json.loads(res.data)['completions']) > 0
