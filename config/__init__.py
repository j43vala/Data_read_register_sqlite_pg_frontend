import json 
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models import Device

# Initialize the 'config' variable to None

config = None

def load_config_from_json():
    # Specify the path to the configuration JSON file
    script_path = os.path.abspath(__file__)
    dir_path = os.path.dirname(script_path)

    config_file_path = os.path.join(dir_path, "config.json")

    # Check if the configuration file exists
    if os.path.isfile(config_file_path):
        # If it exists, open and read the JSON configuration
        with open(config_file_path, 'r') as config_file:
            config = json.load(config_file)
    else:
        print(f"Error: '{config_file_path}' not found")
        # You may want to handle this situation, such as providing default values or exiting the script.

    print("config_loaded from json...")
    return config

def load_config_from_db():
    # Replace 'postgresql://your_username:your_password@localhost/your_database' with your actual PostgreSQL connection URI
    engine = create_engine('postgresql://postgres:postgres@192.168.1.18/plc_2')

    # Create a session
    Session = sessionmaker(bind=engine)
    session = Session()

    # Query devices from the database
    devices = session.query(Device).all()

    # Convert devices to a list of dictionaries
    devices_list = []
    for device in devices:
        device_data = {
            'device_name': device.name,
            'slave_id': device.slave_id,
            'registers': []
        }

        # Add registers for each device
        for register in device.registers:
            register_data = {
                'address': register.address,
                'column_name': register.column_name,
                'type': register.type
            }
            device_data['registers'].append(register_data)

        devices_list.append(device_data)

    # Create a dictionary with the devices list
    config = {"devices": devices_list}

    # Convert the dictionary to JSON format
    # config = json.dumps(result, indent=2)

    # Print or use the JSON data as needed
    # print(config)
    return config

config = load_config_from_json()

print("config before update",json.dumps(config, indent=2))
db_devices = load_config_from_db()


config["devices"] = db_devices["devices"]
print("config after update",json.dumps(config, indent=2))
