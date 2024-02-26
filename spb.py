import time
from mqtt_spb_wrapper import MqttSpbEntityDevice , MqttSpbEntityEdgeNode
from config.data_conversion import read_integer, read_double, read_float
from modbus_final import initialize_modbus_client
import copy
import json
import psutil
import logging
import os

# Initialize loggers
script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)
main_path = os.path.dirname(dir_path)
project_path = os.path.dirname(main_path)
log_file_path = os.path.join(project_path)

# Define error logger
error_logger = logging.getLogger('error_logger')
error_logger.setLevel(logging.ERROR)
error_handler = logging.FileHandler(os.path.join(log_file_path, 'error.log'))
error_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
error_handler.setFormatter(error_formatter)
error_logger.addHandler(error_handler)

# Define info logger
info_logger = logging.getLogger('info_logger')
info_logger.setLevel(logging.INFO)
info_handler = logging.FileHandler(os.path.join(log_file_path, 'info.log'))
info_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
info_handler.setFormatter(info_formatter)
info_logger.addHandler(info_handler)

def get_ram_usage():
    try:
        # Get system memory usage statistics
        mem = psutil.virtual_memory()
        # Total physical memory available in bytes
        total_memory = float(mem.total)
        # Total memory used in bytes
        used_memory = float(mem.used)
        # Format the result string
        result_string = f"{used_memory / (1024 ** 3):.2f} GB/{total_memory / (1024 ** 3):.2f} GB"
        return result_string
    except Exception as e:
        error_logger.error("Error occurred while reading RAM usage: %s", str(e))
        return "Error occurred while reading RAM usage."

def get_node_temp():
    try:
        with open('/sys/class/thermal/thermal_zone0/temp', 'r') as file:
            temperature_str = file.read().strip()
            temperature = float(temperature_str) / 1000.0  # Convert millidegree Celsius to degree Celsius
            return temperature
    except  Exception as e:
        error_logger.error("Error occurred while reading the rpi temperature : ", str(e))
        return 0

def init_spb_edge_node(group_id, edge_node_id, config):
    node = MqttSpbEntityEdgeNode(group_id, edge_node_id)
   
   
    try:
        attributes = config["node_attributes"]
        for attribute in attributes:
            node.attribures.set_value(attribute["name"],attribute["value"])
        temperature = get_node_temp()
        ram_usage = get_ram_usage()
        node.data.set_value("temperature", temperature)
        node.data.set_value("RAM_usage", ram_usage)
        
        
        temp = copy.deepcopy(config)
        
        for device in temp["devices"]:
            del device["model"]
        
        node.attribures.set_value(name = "settings" ,value = json.dumps(temp))

        # Commands
        node.commands.set_value("rebirth", False)
        node.commands.set_value("INFO", False)
        node.commands.set_value("ERROR", False)

        
        config["spb_node"] = node
    except Exception as e:
        error_logger.error("Error occurred during initialization of Sparkplug B Edge Node: %s", str(e))
    else:
        info_logger.info("Successfully initialized Sparkplug B Edge Node.")
    
    return node


def init_spb_device(group_name,edge_node_name, device_dict):
    
    _DEBUG = True  # Enable debug messages

    print("--- Sparkplug B example - End of Node Device - Simple")


    def callback_command(payload):
        metrics = payload.get("metrics")
        command = metrics[0].get("name")
        if command == "rebirth":
            info_logger.info("Node Attribute received CMD: %s" % (payload))
      
        else:
            info_logger.info("Unknown command received: %s" % command)
        info_logger.info("\n\n payload", payload)

    def callback_message(topic, payload):
        info_logger.info("Received MESSAGE: %s - %s" % (topic, payload))
    
    
    device_name = device_dict.get("device_name")
    # Create the spB entity object
   
    device = MqttSpbEntityDevice(group_name, edge_node_name, device_name, _DEBUG)
    # device.publish_data()

    device.on_message = callback_message  # Received messages
    device.on_command = callback_command  # Callback for received commands

    # Set the device Attributes, Data and Commands that will be sent on the DBIRTH message --------------------------

    attributes= device_dict["attributes"]
    for attribute in attributes:
        device.attribures.set_value(attribute["name"],attribute["value"])


    # Data / Telemetry
    for parameter in device_dict["parameters"]:
        device.data.set_value(parameter["parameter_name"], 0)

    # Commands
    device.commands.set_value("rebirth", False)
    device.commands.set_value("INFO", False)
    device.commands.set_value("ERROR", False)

    device_dict["spb_device"] = device

    return device




def connect_spb_device(device_dict, broker , port, user, password):
   
    
    print("Trying to connect to broker...")

    device : MqttSpbEntityDevice = device_dict["spb_device"]
    _connected = device.connect(broker, port, user, password)

    if _connected:
        # Send birth message
        device.publish_birth()
    else:
        error_logger.error("Error, could not connect spb device to broker...")

    device_dict["spb_device_connected"] = _connected
    return _connected


def connect_spb_node(node_dict, broker , port, user, password):
   
    
    info_logger.info("Trying to connect to broker...")

    node = node_dict["spb_node"]
    _connected = node.connect(broker, port, user, password)

    if _connected:
        # Send birth message
        node.publish_birth()
    else:
        error_logger.error("Error, could not connect spb node to broker...")

    node_dict["spb_node_connected"] = _connected
    return _connected


