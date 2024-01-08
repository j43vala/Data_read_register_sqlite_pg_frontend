import time
from pyModbusTCP.client import ModbusClient

slave_address = '192.168.1.5'
port = 502
unit_id = 1
modbus_client = ModbusClient(host= slave_address, port = port, unit_id= unit_id)
if __name__ == '__main__':
    while True:
        regs = modbus_client.read_input_registers(1, 20)
        if regs:
            print(regs)
        else:
            print("read error occured")
        time.sleep(2)