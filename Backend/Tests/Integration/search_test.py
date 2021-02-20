from Backend import create_app
from Backend.Tests import *


def test_search():
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        res = testing_client.post('/Api/User/Register', data=dict(
            name='TEST',
            email='TES@gmail.com',
            password='test'
        ))
        # Will 403 bc already in db
        assert res.status_code == 403

        # Establish an application context
        res = testing_client.post('/Api/User/Login', data=dict(
            email='TES@gmail.com',
            password='test'
        ))

        assert res.status_code == 200


        # Establish an application context
        res = testing_client.get('/Api/Logout')

        assert res.status_code == 200

        # Establish an application context
        res = testing_client.post('/Api/Restaurant/Register', data=dict(
            name='TEST',
            email='joblo_@test.com',
            password='test',
            addr='45 D\'arcy Dr, Winnipeg, MB'
        ))

        assert res.status_code == 403

        # Establish an application context
        res = testing_client.post('/Api/User/Login', data=dict(
            email='joblo_@test.com',
            password='test',
        ))

        res = testing_client.get('/Api/Logout')

        assert res.status_code == 200
