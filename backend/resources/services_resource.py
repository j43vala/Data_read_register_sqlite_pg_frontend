import json
import subprocess
import platform
import shlex
import os
import sys

from flask_restx import Resource, Namespace, fields, reqparse
from flask import jsonify, make_response, request
from db import db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Device, NodeParameter, Attribute, Parameter

script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)
main_path = os.path.dirname(dir_path)
project_path = os.path.dirname(main_path)
log_file_path = os.path.join(project_path)
sys.path.append(log_file_path)

from logger_services import info_logger, error_logger 


ns = Namespace('Services', description='Services related operations')

@ns.route('/restart-services')
class RestartService(Resource):
    def get(self):
        try:
            # Run 'systemctl daemon-reload' to reload units
            subprocess.run(['sudo', 'systemctl', 'restart', 'app_mb_hybrid.service'], check=True)
            # subprocess.run(['sc', 'restart', 'app_mb_hybrid'], check=True)
            info_logger.info("System service has been restarted")
            return 'Services restarted successfully'
        except subprocess.CalledProcessError as e:
            return f'Error restarting services: {str(e)}'
        
@ns.route('/stop-services')
class StopService(Resource):
    def get(self):
        try:
            subprocess.run(['sudo', 'systemctl', 'stop', 'app_mb_hybrid.service'], check=True)
            # subprocess.run(['sc', 'stop', 'app_mb_hybrid'], check=True)
            error_logger.exception("System service has been stopped")
            return 'Services stopped successfully'
        except subprocess.CalledProcessError as e:
            return f'Error stopping services: {str(e)}'
@ns.route('/get-wifi-lists')
class Wifi(Resource):
    def get(self):
        """Retrieve all Wifi SSID In List."""
        status = 0
        # Get the name of the operating system.
        # os_name = platform.system()

        # # Check if the OS is Windows.
        # if os_name == "Windows":
        #     # Command to list Wi-Fi networks on Windows using netsh.
        #     list_networks_command = 'netsh wlan show networks mode=Bssid'
        # # Check if the OS is Linux.
        # elif os_name == "Linux":
        #     # Command to list Wi-Fi networks on Linux using nmcli.
        #     list_networks_command = "nmcli --fields SSID device wifi list"
        # # Handle unsupported operating systems.
        # else:
        #     # Print a message indicating that the OS is unsupported (Not Linux or Windows).
        #     print("Unsupported OS")
        #     return

        # try:
        #     # Execute the command and capture the result.
        #     output = subprocess.check_output(list_networks_command, shell=True, text=True)

        #     # Parse the output and extract SSIDs.
        #     ssids = []
        #     lines = output.splitlines()
        #     header = lines[0].split()
        #     for line in lines[1:]:
        #         values = line.split()
        #         if "SSID" in header:
        #             ssid_index = header.index("SSID")
        #             ssid = values[ssid_index]
        #             ssids.append(ssid)
        #             # Return the list of network names.
        #     status = 1
        #     return make_response(jsonify({"status": status, 'ssids': ssids}), 200)
        #     # print('ssids: ', ssids)


        # except subprocess.CalledProcessError as e:
        #     print(f"Error executing command: {e}")
        
# ---------------------------------------------------------------------------------------------------------------------------------
        os_name = platform.system()
        if os_name == "Linux":
            list_networks_command = "sudo iwlist wlan0 scan | grep ESSID | cut -d '\"' -f 2"
        else:
            return []
        try:
            output = subprocess.check_output(list_networks_command, shell=True, text=True)
            ssids = output.splitlines()
            # return ssids
        except subprocess.CalledProcessError as e:
            print(f"Error executing command: {e}")
            
        status = 1
        return make_response(jsonify({"status": status, 'ssids': ssids}), 200)
        
# -----------------------------------------------------------------------------------------------------------------------------------
        # os_name = platform.system()

        # if os_name == "Windows":
        #     list_networks_command = 'netsh wlan show networks mode=Bssid'
        # elif os_name == "Linux":
        #     if platform.machine().startswith('arm') or 'raspberry' in platform.machine().lower():
        #         # Raspberry Pi/Linux specific command
        #         list_networks_command = "sudo iwlist wlan0 scan | grep ESSID | cut -d '\"' -f 2"
        #     else:
        #         # Generic Linux command
        #         list_networks_command = "nmcli --fields SSID device wifi list"
        # else:
        #     # Unsupported OS
        #     print("Unsupported OS")
        #     return make_response(jsonify({"status": 0, 'error': 'Unsupported OS'}), 400)

        # try:
        #     output = subprocess.check_output(list_networks_command, shell=True, text=True)

        #     ssids = []
        #     lines = output.splitlines()

        #     if os_name == "Windows":
        #         # Parse the output for Windows
        #         header = lines[0].split()
        #         for line in lines[1:]:
        #             values = line.split()
        #             if "SSID" in header:
        #                 ssid_index = header.index("SSID")
        #                 ssid = values[ssid_index].strip()  # Strip leading/trailing whitespaces
        #                 ssids.append(ssid)
        #     elif os_name == "Linux":
        #         # Parse the output for Linux
        #         ssids = [ssid.strip() for ssid in lines if ssid.strip() != "SSID"]  # Exclude "SSID" from the list

        #     status = 1
        #     return make_response(jsonify({"status": status, 'ssids': ssids}), 200)

        # except subprocess.CalledProcessError as e:
        #     print(f"Error executing command: {e}")
        #     return make_response(jsonify({"status": 0, 'error': f"Error executing command: {e}"}), 500)
    


@ns.route("/connect-network")
class ConnectWifi(Resource):
    @ns.doc("connect_network")
    @ns.expect(ns.model("WiFiCredentials", {
        "ssid": fields.String(required=True, description="WiFi SSID"),
        "password": fields.String(required=True, description="WiFi Password"),
    }))
    def post(self):
        """Set Wifi And Password."""
        try:
            # Get data from the request
            data = request.get_json()
            ssid = data.get("ssid")
            password = data.get("password")

            # Sanitize SSID and password to handle special characters
            sanitized_ssid = shlex.quote(ssid)
            sanitized_password = shlex.quote(password)


            # Form the command to add a new WiFi connection
            command = f"sudo nmcli dev wifi connect {sanitized_ssid} password {sanitized_password}"

            # Execute the command using subprocess
            subprocess.run(command, shell=True, check=True)

            return f"Successfully connected to WiFi network: {ssid}"
         
        except subprocess.CalledProcessError as e:
            return f"Error: Failed to connect to WiFi network {ssid}. {e}"

@ns.route('/git-pull')
class GitPullResource(Resource):
    def get(self):
        repo_url = "https://github.com/j43vala/Data_read_register_sqlite_pg_frontend.git"

        try:
            # Run git pull command
            result = subprocess.run(["git", "pull", repo_url], capture_output=True, text=True, check=True)

            # Check the output of the git pull command
            output = result.stdout
            return {'message': 'Git pull successful', 'output': output}, 200
        except subprocess.CalledProcessError as e:
            # If git pull fails, return error message and output
            return {'message': 'Git pull failed', 'output': e.stderr}, 500

# Define the SQLite database file path
script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)
main_path = os.path.join(os.path.dirname(dir_path),'..', 'config')
db_path = os.path.join(main_path, "edge_app.db")

def load_config_from_db():
    # Replace 'postgresql://your_username:your_password@localhost/your_database' with your actual PostgreSQL connection URI
    engine = create_engine(f"sqlite:///{db_path}", echo=False)

    # Create a session
    Session = sessionmaker(bind=engine)
    session = Session()

    # Query devices and associated parameters from the database
    devices = session.query(Device).all()
    print('devices: ', devices)

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

    return config
# load_config_from_db()
@ns.route("/get-json")
class ConfigResource(Resource):
    def get(self):
        status = 0
        config_data = load_config_from_db()
        status = 1
        return make_response(jsonify({"status": status, 'config_data': config_data}), 200)

# Define the parser for file upload
file_upload_parser = reqparse.RequestParser()
file_upload_parser.add_argument('file', location='files', type='file', required=True)


@ns.route("/upload-json")
class FileUploadResources(Resource):
    @ns.expect(file_upload_parser)
    def post(self):
        # Get the uploaded file from the request
        uploaded_file = request.files['file']

        # Save the file to a temporary location
        temp_file_path = os.path.join(os.getcwd(), 'temp_file.json')
        uploaded_file.save(temp_file_path)

        # Read the content of the JSON file
        with open(temp_file_path, 'r') as file:
            json_content = file.read()

        # Clean up the temporary file
        os.remove(temp_file_path)

        try:
            # Attempt to parse the JSON content
            parsed_json = json.loads(json_content)
            for device_data in parsed_json.get('devices', []):
                device_name = device_data.get('device_name')
                device_slave_id = device_data.get('slave_id')

                # Check if the device with the given name exists in the database
                device = db.session.query(Device).filter(Device.name == device_name).first()

                if not device:
                    # If the device doesn't exist, create a new one
                    new_device = Device(name=device_name, slave_id=device_slave_id)
                    db.session.add(new_device)
                    db.session.flush()  # Flush to get the device ID

                else:
                    # Device already exists, update its slave_id if provided
                    if device_slave_id is not None:
                        device.slave_id = device_slave_id

                    new_device = device

                # Update or create attributes
                for attribute_data in device_data.get('attributes', []):
                    attribute_name = attribute_data.get('name')
                    attribute_value = attribute_data.get('value')

                    # Update the attribute value in the database
                    attribute = db.session.query(Attribute).filter(
                        Attribute.device_id == new_device.id,
                        Attribute.name == attribute_name
                    ).first()

                    if attribute:
                        attribute.value = attribute_value
                    else:
                        # If the attribute doesn't exist, create a new one
                        new_attribute = Attribute(device_id=new_device.id, name=attribute_name, value=attribute_value)
                        db.session.add(new_attribute)

                # Update or create parameters
                for parameter_data in device_data.get('parameters', []):
                    parameter_name = parameter_data.get('parameter_name')
                    parameter_address = parameter_data.get('address')
                    parameter_aggregation_type = parameter_data.get('aggregation_type')
                    parameter_data_type = parameter_data.get('data_type')
                    parameter_function_code = parameter_data.get('function_code')
                    parameter_threshold = parameter_data.get('threshold')

                    # Update the parameter in the database
                    parameter = db.session.query(Parameter).filter(
                        Parameter.device_id == new_device.id,
                        Parameter.parameter_name == parameter_name
                    ).first()

                    if parameter:
                        # Parameter exists, update its values
                        parameter.address = parameter_address
                        parameter.aggregation_type = parameter_aggregation_type
                        parameter.data_type = parameter_data_type
                        parameter.function_code = parameter_function_code
                        parameter.threshold = parameter_threshold
                    else:
                        # Parameter doesn't exist, create a new one
                        new_parameter = Parameter(
                            device_id=new_device.id,
                            parameter_name=parameter_name,
                            address=parameter_address,
                            aggregation_type=parameter_aggregation_type,
                            data_type=parameter_data_type,
                            function_code=parameter_function_code,
                            threshold=parameter_threshold
                        )
                        db.session.add(new_parameter)

                db.session.commit()

            # Update or create predefined node parameters
            predefined_node_parameters = [
                'modbus', 'mqtt', 'spb_parameter', 'node_attributes', 'retention_parameter', 'time_delay', 'publish_time'
            ]

            for node_parameter_name in predefined_node_parameters:
                node_parameter_value = parsed_json.get(node_parameter_name, None)

                if node_parameter_name == 'modbus':
                    existing_node_parameter = db.session.query(NodeParameter).filter(
                        NodeParameter.name == node_parameter_name
                    ).first()

                    if existing_node_parameter:
                        existing_node_parameter.value = {**existing_node_parameter.value, **node_parameter_value}
                    else:
                        new_node_parameter = NodeParameter(
                            name=node_parameter_name,
                            value=node_parameter_value
                        )
                        db.session.add(new_node_parameter)

                elif node_parameter_name == 'retention_parameter':
                    existing_retention_parameter = db.session.query(NodeParameter).filter(
                        NodeParameter.name == node_parameter_name
                    ).first()

                    if existing_retention_parameter:
                        existing_retention_parameter.value = {**existing_retention_parameter.value, **node_parameter_value}

                        for retention_type in ['check_frequency', 'failure_retention', 'success_retention']:
                            retention_values = existing_retention_parameter.value.get(retention_type, {})

                            retention_values['hours'] = min(retention_values.get('hours', 0), 24)
                            retention_values['minutes'] = min(retention_values.get('minutes', 0), 59)
                            retention_values['seconds'] = min(retention_values.get('seconds', 0), 59)

                            existing_retention_parameter.value[retention_type] = retention_values

                    else:
                        new_retention_parameter = NodeParameter(
                            name=node_parameter_name,
                            value=node_parameter_value
                        )

                        for retention_type in ['check_frequency', 'failure_retention', 'success_retention']:
                            retention_values = new_retention_parameter.value.get(retention_type, {})

                            retention_values['hours'] = min(retention_values.get('hours', 0), 24)
                            retention_values['minutes'] = min(retention_values.get('minutes', 0), 59)
                            retention_values['seconds'] = min(retention_values.get('seconds', 0), 59)

                            new_retention_parameter.value[retention_type] = retention_values

                        db.session.add(new_retention_parameter)

                elif node_parameter_name in ['time_delay', 'publish_time']:
                    existing_time_parameter = db.session.query(NodeParameter).filter(
                        NodeParameter.name == node_parameter_name
                    ).first()

                    if existing_time_parameter:
                        existing_time_parameter.value = {**existing_time_parameter.value, **node_parameter_value}

                        if node_parameter_name == 'time_delay':
                            existing_time_parameter.value['minutes'] = min(existing_time_parameter.value.get('minutes', 0), 59)
                            existing_time_parameter.value['seconds'] = min(existing_time_parameter.value.get('seconds', 0), 59)
                        elif node_parameter_name == 'publish_time':
                            existing_time_parameter.value['days'] = max(existing_time_parameter.value.get('days', 0), 0)
                            existing_time_parameter.value['hours'] = min(existing_time_parameter.value.get('hours', 0), 23)
                            existing_time_parameter.value['minutes'] = min(existing_time_parameter.value.get('minutes', 0), 59)
                            existing_time_parameter.value['seconds'] = min(existing_time_parameter.value.get('seconds', 0), 59)

                    else:
                        new_time_parameter = NodeParameter(
                            name=node_parameter_name,
                            value=node_parameter_value
                        )

                        if node_parameter_name == 'time_delay':
                            new_time_parameter.value['minutes'] = min(new_time_parameter.value.get('minutes', 0), 59)
                            new_time_parameter.value['seconds'] = min(new_time_parameter.value.get('seconds', 0), 59)
                        elif node_parameter_name == 'publish_time':
                            new_time_parameter.value['days'] = max(new_time_parameter.value.get('days', 0), 0)
                            new_time_parameter.value['hours'] = min(new_time_parameter.value.get('hours', 0), 23)
                            new_time_parameter.value['minutes'] = min(new_time_parameter.value.get('minutes', 0), 59)
                            new_time_parameter.value['seconds'] = min(new_time_parameter.value.get('seconds', 0), 59)

                        db.session.add(new_time_parameter)

                else:
                    if node_parameter_value is not None:
                        node_parameter = db.session.query(NodeParameter).filter(
                            NodeParameter.name == node_parameter_name
                        ).first()

                        if node_parameter:
                            node_parameter.value = node_parameter_value
                        else:
                            new_node_parameter = NodeParameter(
                                name=node_parameter_name,
                                value=node_parameter_value
                            )
                            db.session.add(new_node_parameter)

            db.session.commit()


        except json.JSONDecodeError as e:
            # Handle JSON decoding error
            return make_response(jsonify({"status": 0, "error": f"Invalid JSON format: {str(e)}"}), 400)

        return make_response(jsonify({"status": 1, "json_content": parsed_json}), 200)


