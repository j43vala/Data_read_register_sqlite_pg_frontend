# from flask_mail import Message
# from mail import mail

# def send_password_reset_email(email,new_password):
#     subject = "Reset_Password"

#     html = f"<html><h3> Your new password is <b>{new_password}</b> </h3></html>"
#     send_message = Message(subject,
#                            sender='dhruv.wzero@gmail.com',
#                            recipients=[email])
#     send_message.html = html
#     return mail.send(send_message)