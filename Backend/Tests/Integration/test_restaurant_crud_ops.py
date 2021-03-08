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


def test_get_all_data(client):
    print("")


def test_descr_update(client):
    print("")


def test_create_food(client):
    print("")


def test_delete_food(client):
    print("")


def test_update_food(client):
    print("")


def test_add_tag(client):
    print("")


def test_delete_tag(client):
    print("")


def test_create_staff(client):
    print("")


def test_update_staff(client):
    print("")


def test_delete_staff(client):
    print("")