import time
from mqtt_spb_wrapper import MqttSpbEntityDevice
from config.data_conversion import read_integer, read_double, read_float
from modbus_final import initialize_modbus_client
from config import config


device_meta = {}


def init_spb_device(group_name,edge_node_name, device_dict):
    
    _DEBUG = True  # Enable debug messages

    print("--- Sparkplug B example - End of Node Device - Simple")


    def callback_command(payload):
        print("DEVICE received CMD: %s" % (payload))


    def callback_message(topic, payload):
        print("Received MESSAGE: %s - %s" % (topic, payload))

    
    
    device_name = device_dict.get("device_name")
    # Create the spB entity object
   
    device = MqttSpbEntityDevice(group_name, edge_node_name, device_name, _DEBUG)
    device.publish_data()

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

    device_dict["spb_device"] = device

    return device


def connect_spb_device(device_dict, broker , port):
   
    
    print("Trying to connect to broker...")

    device = device_dict["spb_device"]
    _connected = device.connect(broker, port)

    if _connected:
        # Send birth message
        device.publish_birth()
    else:
        print("Error, could not connect spb device to broker...")

    device_dict["spb_device_connected"] = _connected
    return _connected