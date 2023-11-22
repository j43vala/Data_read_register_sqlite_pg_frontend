
import os
from flask import Flask
import subprocess
# from resources import api
# from flask_cors import CORS
# from db import db
# from resources.node_parameter_resource import create_default_node_parameters

app = Flask(__name__)


@app.route('/restart_services')

def restart_services():
    try:

        # Run 'systemctl daemon-reload' to reload units
        # subprocess.run(['sudo', 'systemctl', 'daemon-reload'], check=True)

        
        subprocess.run(['sudo', 'systemctl', 'restart', 'app_mb_hybrid.service'], check=True)
        # subprocess.run(['sudo', 'systemctl', 'restart', 'app_mb_spb.service'], check=True)
        # subprocess.run(['sudo', 'systemctl', 'restart', 'app_mb_sqlite.service'], check=True)
        return 'Services restarted successfully'
        
    except subprocess.CalledProcessError as e:
        return f'Error restarting services: {str(e)}'

@app.route('/stop_services')
def stop_services():
    try:
        subprocess.run(['sudo', 'systemctl', 'stop', 'app_mb_hybrid.service'], check=True)
        # Add more services to stop if needed
        # subprocess.run(['sudo', 'systemctl', 'stop', 'app_mb_spb.service'], check=True)
        # subprocess.run(['sudo', 'systemctl', 'stop', 'app_mb_sqlite.service'], check=True)
        return 'Services stopped successfully'
    except subprocess.CalledProcessError as e:
        return f'Error stopping services: {str(e)}'


# CORS(app)
# api.init_app(app, cors_allowed_origins='*')

# # Define the SQLite database file path
# script_path = os.path.abspath(__file__)
# dir_path = os.path.dirname(script_path)

# sqlite_db_path = os.path.join(dir_path, "local1.db")
# # print("sqlite db path : ", sqlite_db_path)

# # Set the SQLite connection URL
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + sqlite_db_path
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)

# # Create the database if it doesn't exist
# with app.app_context():
#     db.create_all()
#     create_default_node_parameters()

if __name__ == '__main__':
    app.run(debug=True)


