import json
import smtplib
import ssl
import sys
import re
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
from flask import Blueprint, request
from sqlalchemy.orm import sessionmaker
from Backend import db
from Backend.Utilities import jwt_tools


tracing_bp = Blueprint('tracing_bp', __name__)

"""
Endpoint expects 2 parameters from client
@cookies:   Dictionary of client side cookies
@date:      DateTime date of reported infection
Returns jwt_token to client
"""


@tracing_bp.route('/Api/Tracing/Report', methods=['POST'])
def tracing_send_email():
    session = sessionmaker(bind=db.engine)()

    try:
        parameters = request.json
        date_start, date_end = get_date_range(parameters['date'])
        data = jwt_tools.decode(parameters['cookies'])

        staff = session.execute('select s.name, s.email, u.name '
                                'from staff as s '
                                '   inner join user as u on u.restaurant = s.restaurant '
                                'where s.active = 1 '
                                'and s.restaurant = :restaurant',
                                {'restaurant': data['restaurant'],})

        users = session.execute('select u.name, u.email, t.created_on '
                                'from user as u '
                                '   inner join transaction as t on t.user = u.id '
                                '   and t.restaurant = :restaurant '
                                '   and t.created_on >= :date_start and t.created_on <= :date_end '
                                'where u.active = 1',
                                {
                                    'restaurant': data['restaurant'],
                                    'date_start': date_start,
                                    'date_end': date_end
                                })
        # Only send email if not a test
        if "pytest" not in sys.modules:
            send_message(staff, parameters['date'], True)
            send_message(users, parameters['date'], False)

        jwt_token = jwt_tools.encode(data)

        session.commit()

    except LookupError:
        session.rollback()
        session.close()
        return json.dumps({'success': False, 'error': 'Session Timeout'}), \
               403, {'ContentType': 'application/json'}

    except Exception as e:
        print(str(e))
        session.rollback()
        session.close()
        return json.dumps({'success': False}), 500, {'ContentType': 'application/json'}

    session.close()
    return json.dumps({'success': True, 'jwt_token': jwt_token}), 200, {'ContentType': 'application/json'}


"""
Accessory function; parses date
date        : string of date of event 
@returns    : tuple of start and end date two weeks apart
"""


def get_date_range(date):
    date = re.sub(r"\([^()]*\)", "", date)
    date = datetime.strptime(date, '%a %b %d %Y %H:%M:%S %Z%z ')
    date_start = date - timedelta(days=14)
    date_end = date + timedelta(days=14)

    return date_start, date_end


"""
Accessory function; sends emails 
contacts         : array of all people who may have come into contact
date             : string of the date of report
is_staff         : boolean for if array is of staff
"""


def send_message(contacts, date, is_staff):
    port = 465
    sender = 'safeat.stripe@gmail.com'
    password = '^$26x*%!DD'
    message = MIMEMultipart('alternative')
    message['Subject'] = 'Potential Exposure Notification'
    message['From'] = formataddr(('Safeat', sender))

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', port, context=context) as server:
        server.login(sender, password)
        for contact in contacts:
            message['To'] = contact.email
            content = ''
            if is_staff:
                content = 'An employee at %s has tested positive for Covid-19 on %s.\n\
                           We have notified all staff as a precaution, please contact your manager.' % (contact[2], date)
            else:
                content = 'A staff member at one of the restaurants you ordered from on %s has tested positive for Covid-19 on %s.\n\
                           Although Safeat takes all necessary precautions to limit the spread of disease, \
                           we also let our customers know anytime there has been any reported case from \
                           a restaurant they have ordered from.' % (contact[2], date)
            text = """\
            Hi %s,
            %s
            
            For more information check out:     
            https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html
        
            If you are experiencing any symptoms check out:     
            https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html
                    
            Safeat
            https://safeats.ca
            Email: safeat.stripe@gmail.com
        
            """ % (contact[0], content)
            html = """\
            <html>
                <body>
                    <h3>Hi %s,<br>
                        %s
                    </h3>
                    <h4>
                        For more information check out:
                        
                        <a href="https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html">
                        Public Health Services Canada</a>
                    </h4>
                    <h4>
                        If you are experiencing any symptoms check out:
                        
                        <a href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html">
                        What to do if you are sick</a>
                    </h4>
                    <p>
                        &#169; Safeat<br>
                        <a href="https://safeats.ca">https://safeats.ca</a><br>
                        Email: safeat.stripe@gmail.com
                    </p>
                </body>
            </html>
            """ % (contact[0], content)
            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')
            message.attach(part1)
            message.attach(part2)

            server.sendmail(sender, contact.email, message.as_string())
