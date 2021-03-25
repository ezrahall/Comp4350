from flask import Blueprint, jsonify, request
from sqlalchemy.orm import sessionmaker
from Backend.Utilities import jwt_tools
from Backend import db
import sys
import stripe
import json

# Stripe Secret Key
stripe.api_key = 'sk_test_51IWvOsCXMychAZM4oqHKxvqoZXCur0HcBuhhelJ2Mr7VyP7IRQnBFEgWypUycGKFhYCPfqqqZaODnDgEfhtwF57H00GeEFahIS'
endpoint_secret = 'whsec_7BuWKvdQTCa16ZIO9ul5L6kUhxKtMUWQ'

payment_bp = Blueprint('payment_bp', __name__)

"""
Endpoint used to send basket info to the server and create a checkout session and requires one parameter
@cookies    : Dictionary of client cookies
@basket     : [{"id": 33, "qty": 5}] Stores food id and quantity
@addr       : String of users address to deliver to
@restaurant : ID of restaurant this transaction is occuring with
@return current session ID. 
"""


@payment_bp.route('/Api/Restaurant/Payment', methods=['POST'])
def create_session():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        data = json.loads(request.data)

        user_data = jwt_tools.decode(data['cookies'])
        quant_map = {}
        price = 0.0

        restaurant_id = int(data['restaurant']['id'])

        for food in data['basket']:
            quant_map[int(food['id'])] = int(food['qty'])

        food = session.execute('select mi.id, mi.price '
                               'from menu_item as mi '
                               'where restaurant = :restaurant '
                               'and mi.id in :id_list '
                               'and mi.active = 1',
                               {
                                   'restaurant': restaurant_id,
                                   'id_list': list(quant_map.keys())
                               })
        # iterate through result so that client cant send wrong prices
        # and get cheap meals as a security vulnerability
        for entry in food:
            price += quant_map[entry[0]] * entry[1]

        # Make API Call to Stripe to set up transaction only if not testing
        if "pytest" not in sys.modules:
            stripe_session = stripe.checkout.Session.create(
                success_url='http://localhost:3000/payment/success?id={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:3000/payment/cancel',
                submit_type='pay',
                payment_method_types=['card'],
                line_items=[{
                    'amount': int(price * 100),
                    'name': 'Payment',
                    'currency': 'CAD',
                    'quantity': 1,
                }],
                metadata={
                    'basket': jsonify(data['basket']),
                }
            )
        else:
            # Pull max key from database for testing key generation
            max_key = session.execute(
                'select max(t.id) from transaction as t').fetchall()[0][0]
            stripe_session = {'id': 'test_' + str(max_key + 1)}

        # Create transaction in our data model
        session.execute('insert into transaction values(default,:user,:restaurant,:addr,:cost,0,:stripe_id,now())',
                        {
                            'user': user_data['id'],
                            'restaurant': restaurant_id,
                            'addr': data['address'],
                            'cost': price,
                            'stripe_id': stripe_session['id']
                        })
        # set value for subsequent inserts to know which transaction they are referencing
        session.execute('set @last_transaction = last_insert_id()')
        # Insert Food items into DB for transaction
        for food in data['basket']:
            session.execute('insert into order_log values(default, @last_transaction, :food, :qty)',
                            {
                                'food': food['id'],
                                'qty': food['qty']
                            })

        session.commit()

    except LookupError as e:
        session.rollback()
        session.close()
        print(str(e))
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
            403, {'ContentType': 'application/json'}

    except Exception as e:
        session.rollback()
        session.close()
        print(str(e))
        return json.dumps({'success': False, 'error': str(e)}), 500, {'ContentType': 'application/json'}

    session.close()
    return jsonify(stripe_session)


"""
Endpoint used to retrieve the meta data of a certain checkout session
@sessionId : The session id of the meta data one requires
@cookies   : Dictionary of client side cookies
@return the meta data of the whole session
"""


@payment_bp.route('/Api/Restaurant/Payment/Data', methods=['POST'])
def retrieve_session():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        data = json.loads(request.data)
        user_data = jwt_tools.decode(data['cookies'])
        # Pull transaction as a security and sanity check
        transaction = session.execute('select t.id from transaction as t '
                                      'where t.stripe_transaction = :stripe_id and'
                                      '      t.user = :user_id',
                                      {
                                          'user_id': user_data['id'],
                                          'stripe_id': str(data['id'])
                                      }).fetchall()
        # Error out if user tries to access another users transaction
        if len(transaction) == 0:
            raise Exception("These dam hackers thinking they're clever.....")
        else:
            # Contact Stripe API
            if "pytest" not in sys.modules:
                stripe_session = stripe.checkout.Session.retrieve(
                    data['id'],
                    expand=['payment_intent']
                )
            else:
                stripe_session = {'id': transaction[0][0]}

    except LookupError as e:
        session.rollback()
        session.close()
        print(str(e))
        return json.dumps({'success': False, 'error': 'Session Timout'}), \
            403, {'ContentType': 'application/json'}

    except Exception as e:
        session.rollback()
        session.close()
        print(str(e))
        return json.dumps({'success': False, 'error': str(e)}), 500, {'ContentType': 'application/json'}

    session.close()
    return jsonify(stripe_session)


"""
Endpoint used to create a webhook after each session has been successfully completed
@return Success if the session is completed
"""


@payment_bp.route('/Api/Restaurant/Payment/Webhook', methods=['POST'])
def webhook():
    Session = sessionmaker(bind=db.engine)
    session = Session()

    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature")

    try:
        if "pytest" not in sys.modules:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        else:
            # This is for testing purposes to replicate the data returned by stripe
            event = {
                'type': 'checkout.session.completed',
                'data': {'object': {'id': json.loads(request.data)['id']}}
            }

        # Handle the checkout.session.completed event
        if event['type'] == "checkout.session.completed":
            session.execute('update transaction set state = 1 where stripe_transaction =:id',
                            {
                                'id': event['data']['object']['id']
                            })
            # TODO Also need to send money to the restaurant
        else:  # Safe to assume transaction cancelled or failed for now
            session.execute('update transaction set state = -1 where stripe_transaction =:id',
                            {
                                'id': event['data']['object']['id']
                            })

        session.commit()

    except ValueError as e:
        # Invalid payload
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Invalid Payload'}), 400, {'ContentType': 'application/json'}

    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Invalid Signature'}), 400, {'ContentType': 'application/json'}

    except Exception as e:
        # Generic Exception
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': str(e)}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
