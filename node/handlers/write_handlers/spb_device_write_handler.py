import time
from mqtt_spb_wrapper import MqttSpbEntityDevice
from logger_services import info_logger, error_logger
import psutil
import os

from serializer import NodeSerializer, DeviceSerializer, SparkplugBSerializer


class SPBDevice():
    
    def __init__(self,spb:SparkplugBSerializer,device:DeviceSerializer):
        
        self.device_data = device
        self.spb_data = spb
        self.connected = False
        
        self.device = MqttSpbEntityDevice(
            spb_group_name = spb.group_name,
            spb_eon_name = spb.gateway_name,
            spb_eon_device_name = device.device_name,
            )
        
        def callback_message(topic, payload):
            info_logger.info("Received MESSAGE: %s - %s" % (topic, payload))
        
        def callback_command(payload):
            metrics = payload.get("metrics")
            command = metrics[0].get("name")
            if command == "rebirth":
                info_logger.info("Node Attribute received CMD: %s" % (payload))

            else:
                info_logger.info("Unknown command received: %s" % command)
            info_logger.info("\n\n payload", payload)

            
        self.device.on_message = callback_message  # Received messages
        self.device.on_command = callback_command  # Callback for received commands

        for attribute in device.attributes:
            self.device.attribures.set_value(attribute.name,attribute.value)
            
        for parameter in device.parameters:
            self.device.data.set_value(parameter.parameter_name, parameter.value)
        
        for command in device.commands:
            self.device.commands.set_value(command, False)
        
        self.connect_spb_device()
            
    def connect_spb_device(self):
        self.device.connect(
            host=self.spb_data.host, 
            port=self.spb_data.port, 
            user=self.spb_data.user, 
            password=self.spb_data.password
            )

        if self.device.is_connected():
            # Send birth message
            self.device.publish_birth()
        else:
            error_logger.error("Error, could not connect spb device to broker...")
