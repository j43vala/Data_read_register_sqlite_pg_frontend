import os
from flask import Flask, render_template
from resources import api
from flask_cors import CORS
from db import db
from resources.node_parameter_resource import create_default_node_parameters

app = Flask(__name__)

CORS(app)

@app.route("/")
def index():
    return render_template('index.html')

api.init_app(app, cors_allowed_origins='*')

# Define the SQLite database file path
script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)

sqlite_db_path = os.path.join(dir_path, "local1.db")
# print("sqlite db path : ", sqlite_db_path)

# Set the SQLite connection URL
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + sqlite_db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create the database if it doesn't exist
with app.app_context():
    db.create_all()
    create_default_node_parameters()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    
    
# from flask import Flask
# from resources import api
# from flask_cors import CORS
# # from resources.user_resources import UserResource
# # from resources.user_data_resources import UserDataResource
# # from resources.resources import ClimateResource
# from db import db
# from sqlalchemy import create_engine
# import psycopg2


# app = Flask(__name__)
# app.config.from_pyfile('config.py')

# CORS(app)
# api.init_app(app, cors_allowed_origins='*')

# def create_database():
#     try:
#         # Connect to the default PostgreSQL database (postgres) and create the new database
#         conn = psycopg2.connect(
#             dbname='postgres',
#             # Replace with your PostgreSQL username
#             user=app.config['DB_USER'],
#             # Replace with your PostgreSQL password
#             password=app.config['DB_PASSWORD'],
#             host=app.config['DB_HOST'],  # Replace with your PostgreSQL host
#             port=app.config['DB_PORT']  # Replace with your PostgreSQL port
#         )
#         conn.autocommit = True
#         cursor = conn.cursor()
#         cursor.execute('CREATE DATABASE {}'.format(app.config['DEFAULT_DATABASE_NAME']))
#         cursor.close()
#         conn.close()
#     except psycopg2.errors.DuplicateDatabase:
#         pass  # The database already exists; no need to recreate it.
#     except Exception as e:
#         print(f"Error creating database: {e}")
# # Create the database if it doesn't exist
# create_database()
# # make this dynamic for every database

# connection_url = app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@{}:{}/{}'.format(
#         app.config['DB_USER'], app.config['DB_PASSWORD'],
#         app.config['DB_HOST'], app.config['DB_PORT'], app.config['DEFAULT_DATABASE_NAME'])

# db.init_app(app)
# engine = create_engine(connection_url)
# connection= engine.connect()


# with app.app_context():
#     db.create_all()
    

# if __name__ == '__main__':
#     app.run(debug=True)

