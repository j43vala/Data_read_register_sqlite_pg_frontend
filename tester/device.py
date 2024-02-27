import time
from mqtt_spb_wrapper import *

_DEBUG = True  # Enable debug messages

print("--- Sparkplug B example - End of Node Device - Simple")


def callback_command(payload):
    print("\n\n\n ------------------------ cmd DEVICE received CMD: %s" % (payload))


def callback_message(topic, payload):
    print("\n\n Received MESSAGEof call back message ------------------------: %s - %s" % (topic, payload))


# Create the spB entity object
group_name = "wzero_tst"
edge_node_name = "GroupTest"
device_name = "GroupTest"

device = MqttSpbEntityDevice(group_name, edge_node_name, device_name, _DEBUG)

device.on_message = callback_message  # Received messages

device.on_command = callback_command  # Callback for received commands

# Set the device Attributes, Data and Commands that will be sent on the DBIRTH message --------------------------

# Attributes
device.attribures.set_value("description", "Simple EoN Device node")
device.attribures.set_value("type", "Simulated-EoND-device")
device.attribures.set_value("version", "0.01")

# Data / Telemetry
device.data.set_value("value", 0)

# Commands
device.commands.set_value("rebirth", False)
device.commands.set_value(name="INFO",value=False)
device.commands.set_value(name="ERROR",value=False)

# Try to connect to the broker --------------------------------------------
_connected = False
while not _connected:
    print("Trying to connect to broker...")
    _connected = device.connect("broker.hivemq.com", 1883)
    if not _connected:
        print("  Error, could not connect. Trying again in a few seconds ...")
        time.sleep(3)

# Send birth message
device.publish_birth()

# Send some telemetry values ---------------------------------------
value = 0  # Simple counter
for i in range(5):
    # Update the data value
    device.data.set_value("value", value)

    # Send data values
    print("Sending data - value : %d" % value)
    device.publish_data()

    # Increase counter
    value += 1

    # Sleep some time
    time.sleep(5)

# Disconnect device -------------------------------------------------
# After disconnection the MQTT broker will send the entity DEATH message.
print("Disconnecting device")
device.disconnect()

print("Application finished !")