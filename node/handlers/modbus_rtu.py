# ----------------
# modbus RTU client 
#-----------------

import time
import struct
from random import randint
from datetime import datetime
from pymodbus.client import ModbusSerialClient as ModbusClient
from pymodbus.client import ModbusSerialClient as ModbusClient
from logger_services import info_logger, error_logger
from redis import StrictRedis
from serializer.devices import NodeSerializer, DeviceSerializer
from .redis_interface import RedisInterface

class ModbusRTUHandler(ModbusClient):
      
    def __init__(self, port,parity='N',baudrate=9600,stopbits=1,bytesize=8):
        # Initialize Modbus RTU communication

        self.client = ModbusClient(method='rtu', port=port, stopbits=stopbits, bytesize=bytesize, parity=parity, baudrate=baudrate)

        # Connect to the Modbus server
        self.client.connect()
        
    def read_device(self, device:DeviceSerializer):
        # Read data from Modbus RTU devices
        slave_id = device.slave_id
        parameters = device.parameters
        for parameter in parameters:
            address = parameter.address
            data_type = parameter.data_type
            data = self.read_data(slave_id, address, data_type)
            parameter.value = data
    

    def read_data(self, device:DeviceSerializer, redis_interface:RedisInterface):
        # print(device)
        client = self.client
        slave_id = device.slave_id
        for parameter in device.parameters:
            reg_address = parameter.address
            reg_data_type = parameter.data_type
            
            parameter.value = randint(1,1000)
            parameter.last_updated = datetime.now()
            
            redis_interface.store_data(device,parameter)
            print(slave_id,parameter.parameter_name,reg_address, reg_data_type)
            
            
            
        # try:
        #     function_code = 3
        #     data = None  # Initialize data variable

        #     if reg_data_type == "Integer":
        #         data = self.read_integer(client, reg_address, slave_id)
        #         info_logger.info('Integer > ', reg_address, ":", data)
        #     elif reg_data_type == "Double":
        #         data = self.read_double(client, reg_address, slave_id)
        #         info_logger.info('Double > ', reg_address, ":", data)
        #     elif reg_data_type == "Float":
        #         data = self.read_float(client, reg_address, slave_id)
        #         info_logger.info('Float > ', reg_address, ":", data)
        #     elif reg_data_type == "Boolean":
        #         data = self.read_boolean(client, reg_address, slave_id)
        #         info_logger.info('Boolean > ', reg_address, ":", data)
        #     else:
        #         error_logger.error(f"Unsupported reg_data_type '{reg_data_type}' for parameter {reg_address}")

        #     return data

    
        # except Exception as e:
        #     # print(client,slave_id, reg_address, reg_data_type)
        #     error_logger.error(f"error reading modbus data : \n{e}")
        #     return None
        
    


    def read_integer(self, reg_address, slave_id):
        result = self.client.read_holding_registers(reg_address, 2, slave=slave_id)
        if result.isError():
            print(f"Error reading Modbus data: {result}")
            return None
        else:
            data = result.registers[0]
            return data

    def read_double(self, reg_address, slave_id):
        result = self.client.read_holding_registers(reg_address, 2, slave=slave_id)
        if result.isError():
            print(f"Error reading Modbus data: {result}")
            return None
        else:
            reg_1, reg_2 = result.registers
            reg_1 = reg_1 if reg_1 <= 0x7FFF else reg_1 - 0x10000
            reg_2 = reg_2 if reg_2 <= 0x7FFF else reg_2 - 0x10000
            combined_value = (reg_1 << 16) | (reg_2 & 0xFFFF)
            return combined_value

    def read_float(self, reg_address, slave_id):
        result = self.client.read_holding_registers(reg_address, 2, slave=slave_id)
        if result.isError():
            print(f"Error reading Modbus data: {result}")
            return None
        else:
            reg_1, reg_2 = result.registers
            float_value = struct.unpack('<f', struct.pack('<HH', reg_1, reg_2))[0]
            return float_value


    def read_boolean(self, reg_address , slave_id):
        result = self.client.read_coils(reg_address, 1, slave=slave_id)
        if result.isError():
            print(f"Error reading Modbus coil status: {result}")
            return None
        else:
            return result.bits[0]
