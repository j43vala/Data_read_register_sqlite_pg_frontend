from config import config
from pymodbus.client import ModbusSerialClient as ModbusClient
import logging
import os 

script_path = os.path.abspath(__file__)
dir_path = os.path.dirname(script_path)
main_path = os.path.dirname(dir_path)
project_path = os.path.dirname(main_path)
log_file_path = os.path.join(project_path)
# Define loggers
error_logger = logging.getLogger('error_logger')
error_logger.setLevel(logging.ERROR)
error_handler = logging.FileHandler(os.path.join(log_file_path, 'error.log'))
error_formatter = logging.Formatter('%(asctime)s -  %(levelname)s - %(message)s')
error_handler.setFormatter(error_formatter)
error_logger.addHandler(error_handler)

info_logger = logging.getLogger('info_logger')
info_logger.setLevel(logging.INFO)
info_handler = logging.FileHandler(os.path.join(log_file_path, 'info.log'))
info_formatter = logging.Formatter('%(asctime)s -  %(levelname)s - %(message)s')
info_handler.setFormatter(info_formatter)
info_logger.addHandler(info_handler)

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
    client.connect()

    return client

def read_integer(client, reg_address, slave_id):
    result = client.read_holding_parameters(reg_address, 2, slave=slave_id)
    if result.isError():
        error_logger.error(f"Error reading Modbus data: {result}")
        return None
    else:
        data = result.parameters[0]
        return data

client = initialize_modbus_client()
info_logger.info("Modbus client initialized successfully: %s", client)

for reg in range(20):
    data = read_integer(client, reg, 3)
    info_logger.info("Data read from register %s: %s", reg, data)