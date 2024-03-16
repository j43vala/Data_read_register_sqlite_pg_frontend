import json 
import os
import logging 

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models import Device, NodeParameter

# Initialize the 'config' variable to None

config = None

script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)
main_path = os.path.dirname(dir_path)
db_path = os.path.join(main_path, "config", "edge_app.db")

script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)
main_path = os.path.dirname(dir_path)
log_file_path = os.path.join(main_path)

# Define loggers
error_logger = logging.getLogger('error_logger')
error_logger.setLevel(logging.ERROR)
error_handler = logging.FileHandler(os.path.join(log_file_path, 'error.log'))
error_formatter = logging.Formatter('%(asctime)s -  %(levelname)s - %(message)s')
error_handler.setFormatter(error_formatter)
error_logger.addHandler(error_handler)

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
    global config
    engine = create_engine(f"sqlite:///{db_path}", echo=False)

     # Create a session
    Session = sessionmaker(bind=engine)
    session = Session()

    # Query devices and associated parameters from the database
    devices = session.query(Device).all()
    if not devices:
        error_logger.exception("No Devices found")

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
                'function_code': parameter.function_code,
                'address': parameter.address,
                'parameter_name': parameter.parameter_name,
                'data_type': parameter.data_type,
                'threshold': parameter.threshold,
                'aggregation_type': parameter.aggregation_type,
                
            }
            device_data['parameters'].append(parameter_data)

        devices_list.append(device_data)

    # Query node parameters for all devices
    node_parameters = session.query(NodeParameter).all()

    # Convert node parameters to the desired format
    formatted_node_parameters = {}
    for node_parameter in node_parameters:
        formatted_node_parameters[node_parameter.name] = node_parameter.value
        
    
    # Exclude specific options from the 'modbus' section
    excluded_modbus_options = ['parity_options', 'port_options', 'wordlength_options', 'baudrate_options', 'method_options', 'stopbits_options']

    # Filter out excluded options
    filtered_modbus_options = {
            key: value for key, value in formatted_node_parameters.get("modbus", {}).items() 
            if key not in excluded_modbus_options and value is not None
        }
    
    # Exclude specific options from the 'modbus' section
    excluded_mqtt_options = ['qos_options']

    # Filter out excluded options
    filtered_mqtt_options = {
            key: value for key, value in formatted_node_parameters.get("mqtt", {}).items() 
            if key not in excluded_mqtt_options and value is not None
        }
    # Create a dictionary with the devices list, node parameters, and additional structure
    config = {
        "modbus": filtered_modbus_options,
        "mqtt": filtered_mqtt_options,
        "spb_parameter": formatted_node_parameters.get("spb_parameter", {}),
        "node_attributes": formatted_node_parameters.get("node_attributes", []),
        "retention_parameter": formatted_node_parameters.get("retention_parameter", []),
        "time_delay": formatted_node_parameters.get("time_delay", []),
        "publish_time": formatted_node_parameters.get("publish_time", []),
        "devices": devices_list
    }

    # Convert the dictionary to JSON format
    # config = json.dumps(result, indent=2)

    # Print or use the JSON data as needed
    # print(config)
    return config

# config = load_config_from_json()

# print("config before update",json.dumps(config, indent=2))
config_from_db = load_config_from_db()


# config["devices"] = db_devices["devices"]
# print("config after update",json.dumps(config, indent=2))
