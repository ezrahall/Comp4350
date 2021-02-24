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


def test_login(client):
    res = client.post('/Api/User/Login', json={
        'email': "TES@gmail.com",
        'password': "test"
    }, content_type='application/json')

    assert res.status_code == 200

    # Establish an application context
    res = client.get('/Api/Logout')

    assert res.status_code == 200
