from flask_mail import Message
from mail import mail
from flask import request,current_app
from itsdangerous import URLSafeTimedSerializer

def send_password_reset_email(email,new_password):
    
    html = f"<html><h3> Your new password is <b>{new_password}</b> </h3></html>"
    send_message = Message(subject="Reset_Password",
                           sender='dhruv.wzero@gmail.com',
                           recipients=[email])
    send_message.html = html
    return mail.send(send_message)

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(current_app.config['JWT_SECRET_KEY'])
    return serializer.dumps(email, salt=current_app.config['SECURITY_PASSWORD_SALT'])
def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(current_app.config['JWT_SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=current_app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False    
    return email


def send_confirmation_email(email):

    confirmation_token = generate_confirmation_token(email)
    
    link = f"<a href= {request.url_root[:-1]}/confirmation/{confirmation_token}>Confirm link</a>"

    html = f"<html>To confirm your registration please confirm the link given : <b>{link}<b>"

    
    send_message = Message(subject="Registration Confirmation",
                      sender='dhruv.wzero@gmail.com',
                      recipients=[email])
    send_message.html = html
    return mail.send(send_message)