from flask import Blueprint, request, jsonify

import json
import os
import stripe

# Secret Key
stripe.api_key = 'sk_test_51IWvOsCXMychAZM4oqHKxvqoZXCur0HcBuhhelJ2Mr7VyP7IRQnBFEgWypUycGKFhYCPfqqqZaODnDgEfhtwF57H00GeEFahIS'


payment_bp = Blueprint('payment_bp', __name__)


@payment_bp.route('/Api/Restaurant/Payment', methods=['POST'])
def payment():

    try:

        email = request.json.get('email', None)  # Get Email or None
        #basket = request.json.geet('basket', None)

        if not email:
            return 'You need to send an Email', 400

        # if not basket:
        #     return 'You have nothing in your cart', 400

        intent = stripe.PaymentIntent.create(
            amount=100,
            currency='cad',
            receipt_email=email
        )

        return {'client_secret': intent['client_secret']}, 200

    except Exception as e:
        return jsonify(error=str(e)), 403
