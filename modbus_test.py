from config import config
from pymodbus.client import ModbusSerialClient as ModbusClient


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
        print(f"Error reading Modbus data: {result}")
        return None
    else:
        data = result.parameters[0]
        return data

client = initialize_modbus_client()
print(client)

for reg in range(20):
    data = read_integer(client, reg, 3)

    print(data)