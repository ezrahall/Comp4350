from flask import Blueprint, jsonify, request
import stripe
import json

# Stripe Secret Key
stripe.api_key = 'sk_test_51IWvOsCXMychAZM4oqHKxvqoZXCur0HcBuhhelJ2Mr7VyP7IRQnBFEgWypUycGKFhYCPfqqqZaODnDgEfhtwF57H00GeEFahIS'


payment_bp = Blueprint('payment_bp', __name__)


"""
Endpoint used to send basket info to the server and create a checkout session and requires one parameter
@basket : The basket for the current user in the current session
@return current session ID. 
"""


@payment_bp.route('/Api/Restaurant/Payment', methods=['POST'])
def create_session():
    data = json.loads(request.data)

    basket = data.get('basket')
    price = 0

    for item in basket:
        price += float(item.get('price')) * int(item.get('qty'))

    total_price = int(price * 100)

    session = stripe.checkout.Session.create(
        success_url='http://localhost:5000/Payment/success?id={CHECKOUT_SESSION_ID}',
        cancel_url='http://localhost:5000/Payment/cancel',
        submit_type='pay',
        payment_method_types=['card'],
        line_items=[{
            'amount': total_price,
            'name': 'Payment',
            'currency': 'CAD',
            'quantity': 1,
        }],
        metadata={
            'basket': jsonify(data['basket']),
        }
    )
    return jsonify(session)


"""
Endpoint used to retrieve the meta data of a certain checkout session
@sessionId : The session id of the meta data one requires
@return the meta data of the whole session
"""


@payment_bp.route('/Api/Restaurant/Payment/Data')
def retrieve_session():
    session = stripe.checkout.Session.retrieve(
        request.args['id'],
        expand=['payment_intent'],
    )
    return jsonify(session)
