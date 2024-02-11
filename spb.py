import time
from mqtt_spb_wrapper import MqttSpbEntityDevice , MqttSpbEntityEdgeNode
from config.data_conversion import read_integer, read_double, read_float
from err_inf import handle_error_command, handle_info_command
from modbus_final import initialize_modbus_client
import copy
import json
import psutil

def get_ram_usage():
    try:
        # Get system memory usage statistics
        mem = psutil.virtual_memory()
        # Total physical memory available in bytes
        total_memory = mem.total
        # Total memory used in bytes
        used_memory = mem.used
        return total_memory, used_memory
    except Exception as e:
        print("Error occurred while reading RAM usage: ", str(e))
        return 0, 0
# Example usage
total_ram, used_ram = get_ram_usage()
print(f"RAM: {used_ram / (1024 ** 3):.2f} GB / {total_ram / (1024 ** 3):.2f} GB")

def get_node_temp():
    try:
        with open('/sys/class/thermal/thermal_zone0/temp', 'r') as file:
            temperature_str = file.read().strip()
            temperature = float(temperature_str) / 1000.0  # Convert millidegree Celsius to degree Celsius
            return temperature
    except  Exception as e:
        print("Error occurred while reading the rpi temperature : ", str(e))
        return 0

def init_spb_edge_node(group_id, edge_node_id, config):
    
    _DEBUG = True  # Enable debug messages

    print("--- Sparkplug B example - End of Node Attribute - Simple")

    # def callback_command(payload):
    #     print("Node Attribute received CMD: %s" % (payload))
    def callback_command(payload):
        command = payload.get("name")
        if command == "rebirth":
            print("Node Attribute received CMD: %s" % (payload))
        elif command == "info":
            info_str = handle_info_command(info_keyword_to_search = "INFO", num_occurrences=10)
            print("\n\n\n\n\n",info_str)
        elif command == "error":
            error_str = handle_error_command(error_keyword_to_search="ERROR", num_occurrences=5)
            print("\n\n\n\n\n",error_str)
        else:
            print("Unknown command received: %s" % command)
        print("\n\n payload", payload)
    def callback_message(topic, payload):
        print("Node Attribute Received MESSAGE: %s - %s" % (topic, payload))
    
    
    # Create the spB entity object
   
    node = MqttSpbEntityEdgeNode(group_id, edge_node_id)
   
   
    node.on_message = callback_message  # Received messages
    node.on_command = callback_command  # Callback for received commands

    # Set the node Attributes, Data and Commands that will be sent on the DBIRTH message --------------------------

    attributes = config["node_attributes"]
    for attribute in attributes:
        node.attribures.set_value(attribute["name"],attribute["value"])
    temperature = get_node_temp()
    ram = get_ram_usage()
    
    node.data.set_value("temperature", temperature)
    node.data_set_value("RAM_usage", {"used": used_ram, "total": total_ram})
    
    
    temp = copy.deepcopy(config)
    
    for device in temp["devices"]:
        del device["model"]
    
    node.attribures.set_value(name = "settings" ,value = json.dumps(temp))

    # Commands
    node.commands.set_value("rebirth", False)
    node.commands.set_value("INFO", False)
    node.commands.set_value("ERROR", False)

    
    config["spb_node"] = node

    
    
    return node




def init_spb_device(group_name,edge_node_name, device_dict):
    
    _DEBUG = True  # Enable debug messages

    print("--- Sparkplug B example - End of Node Device - Simple")


    def callback_command(payload):
        print("DEVICE received CMD: %s" % (payload))
        metrics = payload.get("metrics")
        command = metrics[0].get("name")
        print('\n\n\n\ncommand: ', command)
        if command == "rebirth":
            print("Node Attribute received CMD: %s" % (payload))
        elif command == "INFO":
            info_str = handle_info_command(info_keyword_to_search = "INFO", num_occurrences=10)
            print("\n\n\n\n\n-------------------info STR :: \n",info_str)
        elif command == "ERROR":
            error_keyword_to_search = "ERROR"
            error_result = handle_error_command(error_keyword_to_search)
            print("\n\n\n\n\n -------------------ERROR STR :: \n",error_result)
        else:
            print("Unknown command received: %s" % command)
        print("\n\n payload", payload)

    def callback_message(topic, payload):
        print("Received MESSAGE: %s - %s" % (topic, payload))
    
    
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
        print("Error, could not connect spb device to broker...")

    device_dict["spb_device_connected"] = _connected
    return _connected


def connect_spb_node(node_dict, broker , port, user, password):
   
    
    print("Trying to connect to broker...")

    node = node_dict["spb_node"]
    _connected = node.connect(broker, port, user, password)

    if _connected:
        # Send birth message
        node.publish_birth()
    else:
        print("Error, could not connect spb node to broker...")

    node_dict["spb_node_connected"] = _connected
    return _connected


