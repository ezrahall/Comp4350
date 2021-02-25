import time
import jwt

key = 'wJNYzeRsUgnBK0DicB0W1TUXkLR516NGuHOpVBur'


def encode(data):
    return jwt.encode({
        "id": data['id'],
        "expiration": time.time() + 1200,
        'restaurant': data['restaurant']},
        key,
        algorithm="HS256")


def decode(cookies):
    if 'jwt_token' in cookies:
        token = jwt.decode(cookies.get("jwt_token"), key, algorithms=["HS256"])

        if token['expiration'] > time.time():
            return token
        else:
            raise LookupError
    else:
        raise LookupError
