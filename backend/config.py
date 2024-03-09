import os

SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = True
DATABASE_TYPE = 'postgresql'
DEFAULT_DATABASE_NAME='plc_2'

DB_USER = 'postgres'
DB_PASSWORD = 'postgres'
DB_HOST = os.getenv('DB_HOST','localhost')
# DB_HOST =  '192.168.1.16'
DB_PORT = '5432'
JWT_SECRET_KEY = 'wzero'
JWT_ACCESS_TOKEN_EXPIRES = False

# #this config_file is used to send email
# MAIL_SERVER='smtp.gmail.com'
# MAIL_USERNAME='dhruv.wzero@gmail.com'
# MAIL_PASSWORD='qphonjlbtukkkuxj'
# MAIL_PORT=465
# MAIL_USE_SSL=True
# MAIL_USE_TLS=False
# SECURITY_PASSWORD_SALT = 'super-secret_for_email_token_salt'
