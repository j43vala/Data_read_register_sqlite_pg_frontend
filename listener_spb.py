<<<<<<< Updated upstream
import os
import time
from mqtt_spb_wrapper import *

# APPLICATION default configuration parameters -----------------------------------------------
_DEBUG = True   # Enable debug messages

# Sparkplug B parameters
_config_spb_group_name = os.environ.get("SPB_GROUP", "wzero")
_config_spb_app_name = os.environ.get("SPB_APP", "ListenApp01")

# MQTT Configuration
_config_mqtt_topic = "#"    # Topic to listen

_config_mqtt_host = os.environ.get("MQTT_HOST", "broker.hivemq.com")
_config_mqtt_port = int(os.environ.get("MQTT_PORT", 1883))

_config_mqtt_user = os.environ.get("MQTT_USER", "")
_config_mqtt_pass = os.environ.get("MQTT_PASS", "")
_config_mqtt_tls_enabled = os.environ.get("MQTT_TLS_ENABLED", '').lower() in ('true', '1', 't')

_config_mqtt_tls_ca = os.environ.get("MQTT_TLS_CA", "")
_config_mqtt_tls_cert = os.environ.get("MQTT_TLS_CERT", "")
_config_mqtt_tls_key = os.environ.get("MQTT_TLS_KEY", "")


def callback_app_message(topic, payload):
    """
        Callback for received messages events
    """
    print("\n\nAPP received MESSAGE: %s - %s" % (topic, payload))


def callback_app_command(payload):
    """
        Callback for received commands events
    """
    print("APP received CMD: %s" % payload)

    # Parse commands
    for cmd in payload['metrics']:

        # Parse fields
        name = cmd["name"]
        value = cmd["value"]

        # Parse commands
        if name == "ping" and value:  # Ping command

            # Send response
            app.data.update_value("ping", True)
            app.publish_data()

            print("  CMD Ping received - Sending response")

print("--- Sparkplug B example - Application Entity Listener")

# Create the spB application entity
app = MqttSpbEntityApplication(spb_group_name=_config_spb_group_name,
                               spb_app_entity_name=_config_spb_app_name,
                               debug_info=_DEBUG)
# Set callbacks
app.on_message = callback_app_message
app.on_command = callback_app_command

# ATTRIBUTES
app.attribures.set_value("Info", "Test application")

# COMMANDS
app.commands.set_value("ping", False)
app.data.set_value("ping", False)

# Connect to the broker.
_connected = False
while not _connected:
    print("Connecting to data broker %s:%d ..." % (_config_mqtt_host, _config_mqtt_port))
    _connected = app.connect(_config_mqtt_host,
                             _config_mqtt_port,
                             _config_mqtt_user,
                             _config_mqtt_pass,
                             _config_mqtt_tls_enabled,
                             _config_mqtt_tls_ca,
                             _config_mqtt_tls_cert,
                             _config_mqtt_tls_key)
    if not _connected:
        print("  Error, could not connect. Trying again in a few seconds ...")
        time.sleep(3)

app.publish_birth()  # Send birth message

# Loop forever
while True:
=======
import os
import time
from mqtt_spb_wrapper import *

# APPLICATION default configuration parameters -----------------------------------------------
_DEBUG = True   # Enable debug messages

# Sparkplug B parameters
_config_spb_group_name = os.environ.get("SPB_GROUP", "wzero")
_config_spb_app_name = os.environ.get("SPB_APP", "ListenApp01")

# MQTT Configuration
_config_mqtt_topic = "#"    # Topic to listen

_config_mqtt_host = os.environ.get("MQTT_HOST", "broker.hivemq.com")
_config_mqtt_port = int(os.environ.get("MQTT_PORT", 1883))

_config_mqtt_user = os.environ.get("MQTT_USER", "")
_config_mqtt_pass = os.environ.get("MQTT_PASS", "")
_config_mqtt_tls_enabled = os.environ.get("MQTT_TLS_ENABLED", '').lower() in ('true', '1', 't')

_config_mqtt_tls_ca = os.environ.get("MQTT_TLS_CA", "")
_config_mqtt_tls_cert = os.environ.get("MQTT_TLS_CERT", "")
_config_mqtt_tls_key = os.environ.get("MQTT_TLS_KEY", "")


def callback_app_message(topic, payload):
    """
        Callback for received messages events
    """
    print("\n\nAPP received MESSAGE: %s - %s" % (topic, payload))


def callback_app_command(payload):
    """
        Callback for received commands events
    """
    print("APP received CMD: %s" % payload)

    # Parse commands
    for cmd in payload['metrics']:

        # Parse fields
        name = cmd["name"]
        value = cmd["value"]

        # Parse commands
        if name == "ping" and value:  # Ping command

            # Send response
            app.data.update_value("ping", True)
            app.publish_data()

            print("  CMD Ping received - Sending response")

print("--- Sparkplug B example - Application Entity Listener")

# Create the spB application entity
app = MqttSpbEntityApplication(spb_group_name=_config_spb_group_name,
                               spb_app_entity_name=_config_spb_app_name,
                               debug_info=_DEBUG)
# Set callbacks
app.on_message = callback_app_message
app.on_command = callback_app_command

# ATTRIBUTES
app.attribures.set_value("Info", "Test application")

# COMMANDS
app.commands.set_value("ping", False)
app.data.set_value("ping", False)

# Connect to the broker.
_connected = False
while not _connected:
    print("Connecting to data broker %s:%d ..." % (_config_mqtt_host, _config_mqtt_port))
    _connected = app.connect(_config_mqtt_host,
                             _config_mqtt_port,
                             _config_mqtt_user,
                             _config_mqtt_pass,
                             _config_mqtt_tls_enabled,
                             _config_mqtt_tls_ca,
                             _config_mqtt_tls_cert,
                             _config_mqtt_tls_key)
    if not _connected:
        print("  Error, could not connect. Trying again in a few seconds ...")
        time.sleep(3)

app.publish_birth()  # Send birth message

# Loop forever
while True:
>>>>>>> Stashed changes
    time.sleep(1000)