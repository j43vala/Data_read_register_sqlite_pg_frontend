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