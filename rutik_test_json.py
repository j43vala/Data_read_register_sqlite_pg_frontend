from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models import Device, Register

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
result = {"devices": devices_list}

# Convert the dictionary to JSON format
import json
config = json.dumps(result, indent=2)

# Print or use the JSON data as needed
print(config)