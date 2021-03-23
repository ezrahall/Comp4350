from flask import Blueprint, jsonify, request
import stripe
import json

# Stripe Secret Key
stripe.api_key = 'sk_test_51IWvOsCXMychAZM4oqHKxvqoZXCur0HcBuhhelJ2Mr7VyP7IRQnBFEgWypUycGKFhYCPfqqqZaODnDgEfhtwF57H00GeEFahIS'
endpoint_secret = 'whsec_7BuWKvdQTCa16ZIO9ul5L6kUhxKtMUWQ'

payment_bp = Blueprint('payment_bp', __name__)
user_info = {}

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
        success_url='http://localhost:3000/payment/success?id={CHECKOUT_SESSION_ID}',
        cancel_url='http://localhost:3000/payment/cancel',
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


"""
Endpoint used to create a webhook after each session has been successfully completed
@return Success if the session is completed
"""


@payment_bp.route('/Api/Restaurant/Payment/Webhook', methods=['POST'])
def webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )

    except ValueError as e:
        # Invalid payload
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return "Invalid signature", 400

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        print("Payment was successful.")
        user_info['Payment'] = 'succeded'
        # TODO: Database

    return "Success", 200


"""
Endpoint used to create and store data for a certain session
"""


@payment_bp.route('/Api/Restaurant/Payment/Transaction', methods=['GET'])
def user():
    return user_info, 200
