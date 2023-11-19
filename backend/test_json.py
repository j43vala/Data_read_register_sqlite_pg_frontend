from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Device, NodeParameter
import os

# Define the SQLite database file path
script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)

sqlite_db_path = os.path.join(dir_path, "local1.db")
# print("sqlite db path : ", sqlite_db_path)

engine = create_engine(f"sqlite:///{sqlite_db_path}", echo=False)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Query devices and associated parameters from the database
devices = session.query(Device).all()

# Convert devices to a list of dictionaries
devices_list = []
for device in devices:
    device_data = {
        'device_name': device.name,
        'slave_id': device.slave_id,
        'attributes': [],
        'parameters': []
    }

    # Add attributes for each device
    for attribute in device.attributes:
        attribute_data = {
            'name': attribute.name,
            'value': attribute.value
        }
        device_data['attributes'].append(attribute_data)

    # Add parameters for each device
    for parameter in device.parameters:
        parameter_data = {
            'address': parameter.address,
            'parameter_name': parameter.parameter_name,
            'data_type': parameter.data_type
        }
        device_data['parameters'].append(parameter_data)

    devices_list.append(device_data)

# Query node parameters for all devices
node_parameters = session.query(NodeParameter).all()

# Convert node parameters to the desired format
formatted_node_parameters = {}
for node_parameter in node_parameters:
    formatted_node_parameters[node_parameter.name] = node_parameter.value

# Create a dictionary with the devices list, node parameters, and additional structure
config = {
    "modbus": formatted_node_parameters.get("modbus", {}),
    "mqtt": formatted_node_parameters.get("mqtt", {}),
    "spb_parameter": formatted_node_parameters.get("spb_parameter", {}),
    "node_attributes": formatted_node_parameters.get("node_attributes", []),
    "devices": devices_list
}

# Print or use the JSON data as needed
print(config)

