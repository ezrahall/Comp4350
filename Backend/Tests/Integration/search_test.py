from Backend import create_app
from Backend.Tests import *
import json


def test_search():
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        res = testing_client.post('/Api/User/Register', json={
            'name': "TEST",
            'email': "TES@gmail.com",
            'password': "test"
        }, content_type='application/json')
        # Will 403 bc already in db
        assert res.status_code == 403

        # Establish an application context
        res = testing_client.post('/Api/User/Login', json={
            'email': "TES@gmail.com",
            'password': "test"
        }, content_type='application/json')

        assert res.status_code == 200

        # Establish an application context
        res = testing_client.get('/Api/Logout')

        assert res.status_code == 200

        # Establish an application context
        res = testing_client.post('/Api/Restaurant/Register', json={
            'name': "TEST",
            'email': "joblo_@test.com",
            'password': "test",
            'addr': "45 D\'arcy Dr, Winnipeg, MB"
        }, content_type='application/json')

        assert res.status_code == 403

        # Establish an application context
        res = testing_client.post('/Api/User/Login', json={
            'email': "joblo_@test.com",
            'password': "test",
        }, content_type='application/json')

        res = testing_client.get('/Api/Logout')

        assert res.status_code == 200
