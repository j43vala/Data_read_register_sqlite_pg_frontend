# read handlers
from handlers import ModbusRTUHandler
# middleware
from handlers import RedisInterface
# write handlers
from handlers import SPBDevice, SPBEdgeNode
import json
import os
from serializer import NodeSerializer
from pprint import pprint
import redis
import time
from datetime import datetime
from mqtt_spb_wrapper import MqttSpbEntityDevice
from aggregator import Aggregator


current_directory = os.getcwd()
config_path = os.path.join(current_directory, 'node','config_old.json')
config = json.load(open(config_path))

redis_host = 'localhost'
redis_port = 6379

# gateway.py
class Node:
    def __init__(self):
        self.meta = NodeSerializer.model_validate(config)
        self.aggregator = Aggregator()
    
        if self.meta.modbus:
            # Initialize communication protocol handlers
            self.modbus_rtu_handler = ModbusRTUHandler(self.meta.modbus)
        
        # Initialize Redis interface
        self.redis_interface = RedisInterface(redis_host, redis_port)

    def collect_data(self):
        if self.meta.node_read_write_frequency + self.meta.last_read < datetime.now():
            for node_parameter in self.meta.parameters:
                node_parameter.update_value()
            self.meta.last_read = datetime.now()
        
        for device in self.meta.get_devices_for_read_protocol('modbus_rtu'): 
            if device.last_read + self.meta.read_frequency < datetime.now():
                print("\n\n\n\n----------------\n reading device: ", device.device_name)
                
                # Read data from different communication protocols
                self.modbus_rtu_handler.update_value(device)
                
                key = device.device_name
                payload = device.redis_json_dump()
                
                self.redis_interface.store_data(key,payload)
            
       

        # Store data in Redis
        # self.redis_interface.store_data(common_data)

    def publish_data(self):
        
        for device in self.meta.devices:
            if device.last_write + self.meta.write_frequency < datetime.now():
                print("\n\n\n\n----------------\n publishing device: ", device.device_name)
                # Retrieve data from Redis
                dataset = self.redis_interface.retrieve_dataset(key = device.device_name)
                # aggregate dataset
                def get_data_dict(dataset):
                    pprint(dataset)
                    data_dict = {}
                    for data_point in dataset:
                        parameters = data_point.get("parameters")
                        timestamp = data_point.get("timestamp")
                        for parameter in parameters:
                            if not parameter:
                                continue
                            if parameter['parameter_name'] not in data_dict:
                                print(parameter['parameter_name']," not found in ", device.device_name)
                                data_dict[parameter['parameter_name']] = [parameter['value']]
                            else:
                                print(parameter['parameter_name']," found in ", device.device_name)
                                data_dict[parameter['parameter_name']].append(parameter['value'])
                    return data_dict
                data = get_data_dict(dataset)
                print(data)
                
                # aggregate data
                aggregated_data = self.aggregator.aggregate_data(data)
                
                # if data:
                #     for protocol in device.write_protocol:
                #         # create write handlers
                #         if not device.write_handlers.get(protocol) and protocol == 'sparkplug_b':
                #             device.write_handlers[protocol] = SPBDevice(self.meta.spb_parameters, device)
                        
                #         # handle sparkplug b protocol
                #         if protocol == 'sparkplug_b':
                #             spb_device_handler:SPBDevice = device.write_handlers[protocol]
                            
                #             # check connection
                #             if not spb_device_handler.device.is_connected():
                #                 print(device.device_name, "not connected")
                #                 spb_device_handler.connect_spb_device()
                            
                #             for param_data in data.get("parameters"):
                #                 if param_data:            
                #                     spb_device_handler.device.data.set_value(
                #                         name=param_data.get("parameter_name"),
                #                         value=param_data.get("value"),
                #                         timestamp=param_data.get("last_updated")
                #                         )
                                    
                #             # publish data after all parameters are set
                #             spb_device_handler.device.publish_data()
                        
                #         if protocol == 'sqlite':
                #             pass
                        
                #         print(device.device_name, protocol, data)                
                
                device.last_write = datetime.now()

      

# main.py
if __name__ == "__main__":
    node = Node()
    pprint(node.meta.model_dump())

    # Run data collection and publication continuously
    while True:
        node.collect_data()

        node.publish_data()
        # time.sleep(0.1)
