import time
import jwt

key = 'wJNYzeRsUgnBK0DicB0W1TUXkLR516NGuHOpVBur'


def encode(data):
    return jwt.encode({
        "id": data['id'],
        'restaurant': data['restaurant']},
        key,
        algorithm="HS256")


def decode(cookies):
    if 'jwt_token' in cookies:
        return jwt.decode(cookies.get("jwt_token"), key, algorithms=["HS256"])
    else:
        raise LookupError
