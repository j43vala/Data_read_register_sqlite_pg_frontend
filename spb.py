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

    # Call the new function to initialize Sparkplug B entity
    # device = initialize_sp_client(config_device["device_name"], _DEBUG)
    
    
    device_name = device_dict.get("device_name")
    # Create the spB entity object
   
    device = MqttSpbEntityDevice(group_name, edge_node_name, device_name, _DEBUG)
    print('device: ', device)
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

    # Try to connect to the broker --------------------------------------------
    _connected = False
    while not _connected:
        print("Trying to connect to broker...")
        _connected = device.connect("broker.hivemq.com", 1883)
        if not _connected:
            print("Error, could not connect. Trying again in a few seconds ...")
            time.sleep(3)

    # Send birth message
    device.publish_birth()

    device_dict["spb_device"] = device


# for config_device in config["devices"]:
#     init_spb_device(config_device)
#     # create_model(config_device)
