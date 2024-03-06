from handlers import ModbusRTUHandler, ModbusTCPHandler, I2CHandler, RedisInterface
import json
import os
from serializer.devices import NodeSerializer
from pprint import pprint
import redis
import time

current_directory = os.getcwd()
config_path = os.path.join(current_directory, 'node','config_old.json')
config = json.load(open(config_path))
# pprint(config_path)
# pprint( config)

redis_host = 'localhost'
redis_port = 6379



# gateway.py
class Node:
    def __init__(self):
        self.meta = NodeSerializer.model_validate(config)

        # Initialize communication protocol handlers
        self.modbus_rtu_handler = ModbusRTUHandler(port = 'COM3')
        # self.modbus_tcp_handler = ModbusTCPHandler(...)
        # self.i2c_handler = I2CHandler(...)

        # Initialize Redis interface
        self.redis_interface = RedisInterface(redis_host, redis_port)

    def collect_data(self):
        for device in self.meta.devices: 
            # Read data from different communication protocols
            modbus_rtu_data = self.modbus_rtu_handler.read_data(device, self.redis_interface)
        
       

        # Store data in Redis
        # self.redis_interface.store_data(common_data)

    def publish_data(self):
        
        for device in self.meta.devices:
            print("\n\n\n\n----------------\ndevice: ", device.device_name)
            # Retrieve data from Redis
            common_data = self.redis_interface.retrieve_data(device)
            print(device.device_name, common_data)
            while common_data:
                common_data = self.redis_interface.retrieve_data(device)
                print(device.device_name, common_data)

      

# main.py
if __name__ == "__main__":
    node = Node()

    # Run data collection and publication continuously
    for i in range(3):
        node.collect_data()
        time.sleep(1)

    node.publish_data()
