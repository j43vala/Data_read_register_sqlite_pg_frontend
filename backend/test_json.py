from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Device

# Replace 'postgresql://your_username:your_password@localhost/your_database' with your actual PostgreSQL connection URI
engine = create_engine('postgresql://postgres:postgres@localhost/plc_2')

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
        'parameters': []
    }

    # Add parameters for each device
    for parameter in device.parameters:
        parameter_data = {
            'address': parameter.address,
            'parameter_name': parameter.parameter_name,
            'data_type': parameter.data_type
        }
        device_data['parameters'].append(parameter_data)

    devices_list.append(device_data)

# Create a dictionary with the devices list
result = {"devices": devices_list}

# Convert the dictionary to JSON format
import json
config = json.dumps(result, indent=2)

# Print or use the JSON data as needed
print(config)