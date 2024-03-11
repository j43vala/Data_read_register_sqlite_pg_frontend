# ----------------
# modbus RTU client 
#-----------------

import time
import struct
from random import randint
from datetime import datetime
from pymodbus.client import ModbusSerialClient as ModbusClient
from logger_services import info_logger, error_logger
from redis import StrictRedis
from serializer import NodeSerializer, DeviceSerializer, ModbusRTUSerializer
from handlers import RedisInterface

class ModbusRTUHandler(ModbusClient):
      
    def __init__(self, modbus_config:ModbusRTUSerializer):
        
        # Initialize Modbus RTU communication
        self.client = ModbusClient(**modbus_config.model_dump())

        # Connect to the Modbus server
        self.client.connect()
        
    def update_device(self, device:DeviceSerializer):
        # Read data from Modbus RTU devices
        slave_id = device.slave_id
        parameters = device.parameters
        for parameter in parameters:
            address = parameter.address
            data_type = parameter.data_type
            data = self.update_value(slave_id, address, data_type)
            parameter.value = data
    

    def update_value(self, device:DeviceSerializer):
        slave_id = device.slave_id
        for parameter in device.parameters:
            reg_address = parameter.address
            if reg_address:
                reg_data_type = parameter.data_type
            
                try:
                    data = None  # Initialize data variable

                    if reg_data_type == "Integer":
                        data = self.read_integer(reg_address, slave_id)
                    elif reg_data_type == "Double":
                        data = self.read_double(reg_address, slave_id)
                    elif reg_data_type == "Float":
                        data = self.read_float(reg_address, slave_id)
                    elif reg_data_type == "Boolean":
                        data = self.read_boolean(reg_address, slave_id)
                    else:
                        error_str = f"Unsupported reg_data_type  {device.device_name} ({device.slave_id}) :: {parameter.parameter_name} ({parameter.address}:{parameter.data_type})"
                        error_logger.error(error_str)


            
                except Exception as e:
                    # print(client,slave_id, reg_address, reg_data_type)
                    error_logger.error(f"error reading modbus data : \n{e}")
                    data = None
                if data:
                    parameter.value = data
                    parameter.last_updated = datetime.now()
                    parameter.updated = True
                                    
        log_str = f"Stored data in Redis: {device.device_name} ({device.slave_id}) :: {parameter.parameter_name} ({parameter.address}:{parameter.data_type}) {parameter.value}"
        info_logger.info(log_str)
        device.last_read = datetime.now()
        # print(device.device_name,slave_id,parameter.parameter_name,reg_address, reg_data_type, data)
    
    
    def read_boolean(self, reg_address , slave_id):
        result = self.client.read_coils(reg_address, 1, slave=slave_id)
        if result.isError():
            print(f"Error reading Modbus coil status: {result}")
            return None
        else:
            return result.bits[0]


    def read_integer(self, reg_address, slave_id):
        result = self.client.read_holding_registers(reg_address, 1, slave=slave_id)
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
            return self.get_double(reg_1, reg_2)
        
    def get_double(self, reg_1, reg_2):
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
        
    def get_float(self, reg_1, reg_2):
        float_value = struct.unpack('<f', struct.pack('<HH', reg_1, reg_2))[0]
        return float_value

    