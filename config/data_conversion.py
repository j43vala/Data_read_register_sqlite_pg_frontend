import struct
from pymodbus.client import ModbusSerialClient as ModbusClient


def read_integer(client, reg_address, slave_id):
    result = client.read_holding_registers(reg_address, 2, slave=slave_id)
    if result.isError():
        print(f"Error reading Modbus data: {result}")
        return None
    else:
        data = result.registers[0]
        return data

def read_double(client, reg_address, slave_id):
    result = client.read_holding_registers(reg_address, 2, slave=slave_id)
    if result.isError():
        print(f"Error reading Modbus data: {result}")
        return None
    else:
        reg_1, reg_2 = result.registers
        reg_1 = reg_1 if reg_1 <= 0x7FFF else reg_1 - 0x10000
        reg_2 = reg_2 if reg_2 <= 0x7FFF else reg_2 - 0x10000
        combined_value = (reg_1 << 16) | (reg_2 & 0xFFFF)
        return combined_value

def read_float(client, reg_address, slave_id):
    result = client.read_holding_registers(reg_address, 2, slave=slave_id)
    if result.isError():
        print(f"Error reading Modbus data: {result}")
        return None
    else:
        reg_1, reg_2 = result.registers
        float_value = struct.unpack('<f', struct.pack('<HH', reg_1, reg_2))[0]
        return float_value
