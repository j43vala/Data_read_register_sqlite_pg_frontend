import time
from mqtt_spb_wrapper import MqttSpbEntityDevice
from config import config
from config.data_conversion import read_integer, read_double, read_float
from config.client import initialize_modbus_client, initialize_sp_client


device_meta = {}



def init_spb_device(config_device):
    
    _DEBUG = True  # Enable debug messages

    print("--- Sparkplug B example - End of Node Device - Simple")


    def callback_command(payload):
        print("DEVICE received CMD: %s" % (payload))


    def callback_message(topic, payload):
        print("Received MESSAGE: %s - %s" % (topic, payload))

    # Call the new function to initialize Sparkplug B entity
    device = initialize_sp_client(config_device["device_name"], _DEBUG)

    device.on_message = callback_message  # Received messages
    device.on_command = callback_command  # Callback for received commands

    # Set the device Attributes, Data and Commands that will be sent on the DBIRTH message --------------------------

    # Attributes
    device.attribures.set_value("description", "Simple EoN Device node")
    device.attribures.set_value("type", "Simulated-EoND-device")
    device.attribures.set_value("version", "0.01")

    # Data / Telemetry
    for reg in config_device["registers"]:
        device.data.set_value(reg["column_name"], 0)

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

    device_meta[config_device["device_name"]] = device




for config_device in config["devices"]:
    init_spb_device(config_device)
    # create_model(config_device)

def read_and_publish(device_dict, modbus_client, spb_device:MqttSpbEntityDevice):
    function_code = 3
    slave_id = device_dict.get("slave_id", None)
    device_name = device_dict.get("device_name", "")
    # table_name = f"{socket.gethostname()}_{slave_id}_{device_name}"

    print(f"device_name: {device_name} - Reading Modbus registers...")

    if slave_id is None:
        print("Slave ID is missing for the device.")
        return

    register_list = device_dict.get("registers", [])

    for register in register_list:
        reg_address = register.get("address")
        column_name = register.get("column_name")
        reg_type = register.get("type")

        data = None  # Initialize data variable
        if reg_type == "Integer":
            data = read_integer(client, reg_address, slave_id)
            print('Integer > ', reg_address, ":", data)
        elif reg_type == "Double":
            data = read_double(client, reg_address, slave_id)
            print('Double > ', reg_address, ":", data)
        elif reg_type == "Float":
            data = read_float(client, reg_address, slave_id)
            print('Float > ', reg_address, ":", data)
        else:
            print(f"Unsupported reg_type '{reg_type}' for register {reg_address}")
                
            print(column_name, data)
            spb_device.data.set_value(column_name, data)
            print(spb_device.get_dictionary())
    spb_device.publish_data()

client = initialize_modbus_client()

while True:
    for config_device in config["devices"]:
        device_name = config_device["device_name"]
        spb_device = device_meta[device_name]

        read_and_publish(config_device, initialize_modbus_client, spb_device)
        time.sleep(1)