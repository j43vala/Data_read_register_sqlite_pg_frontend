# ----------------
# modbus client 
#-----------------

import time
from pymodbus.client import ModbusSerialClient as ModbusClient
from config import config
from config.data_conversion import read_integer, read_double, read_float

def initialize_modbus_client():
    modbus_config = config.get("modbus")
    com_port = modbus_config.get("port")
    method = modbus_config.get("method", "rtu")
    parity = modbus_config.get("parity", "N")
    baudrate = modbus_config.get("baudrate", 9600)
    stopbits = modbus_config.get("stopbits", 1)
    bytesize = modbus_config.get("bytesize", 8)

    client = ModbusClient(method=method, port=com_port, stopbits=stopbits, bytesize=bytesize, parity=parity, baudrate=baudrate)

    # Connect to the Modbus server
    # client.connect()

    return client

def read_modbus_data(client,slave_id, reg_address, reg_data_type):
    print(client,slave_id, reg_address, reg_data_type)
    try:
        function_code = 3
        data = None  # Initialize data variable

        if reg_data_type == "Integer":
            data = read_integer(client, reg_address, slave_id)
            print('Integer > ', reg_address, ":", data)
        elif reg_data_type == "Double":
            data = read_double(client, reg_address, slave_id)
            print('Double > ', reg_address, ":", data)
        elif reg_data_type == "Float":
            data = read_float(client, reg_address, slave_id)
            print('Float > ', reg_address, ":", data)
        else:
            print(f"Unsupported reg_data_type '{reg_data_type}' for parameter {reg_address}")

        return data

    
    except Exception as e:
        print(f"error reading modbus data : {e}")
        return None