# from flask import Flask
# from flask_apscheduler import APScheduler
# from pymodbus.client import ModbusSerialClient as ModbusClient
# import platform
# import re
# import serial.tools.list_ports

# def get_serial_ports():
#     try:
#         system_os = platform.system()
#         # For Windows, use pyserial's list_ports
#         ports = [port.device for port in serial.tools.list_ports.comports()]
#         com_ports = []
#         for port in ports:
#             if system_os == 'Windows':
#                 match = re.match(r'COM(\d+)', port)
#                 if match:
#                     com_ports.append(f'COM{match.group(1)}')
#             elif system_os == 'Linux':
#                 match = re.match(r'/dev/ttyUSB(\d+)', port)
#                 if match:
#                     com_ports.append(f'/dev/ttyUSB{match.group(1)}')
#         return com_ports
    
#     except Exception as e:
#         print(f"Error fetching serial ports: {e}")
#         return []

# def read_registers(client, reg_addresses, slave_id):
#     try:
#         data = []
#         for reg_address in reg_addresses:
#             result = client.read_holding_registers(reg_address, 2, slave=slave_id)
            
#             if result.isError():
#                 print(f"Error reading Modbus data for register {reg_address}: {result}")
#                 data.append(None)
#             else:
#                 data.append(result.registers[0])
#         return data
#     except Exception as e:
#         print(f"Error reading Modbus data: {e}")
#         return [None] * len(reg_addresses)

# def initialize_client(port):
#     try:
#         client = ModbusClient(method="rtu", port=port, stopbits=1, bytesize=8, parity="N", baudrate=9600)
#         return client
#     except Exception as e:
#         print(f"Error initializing Modbus client: {e}")
#         return None

# class Config:
#     """App configuration."""
#     SCHEDULER_API_ENABLED = True

# app = Flask(__name__)
# app.config.from_object(Config())

# scheduler = APScheduler()
# scheduler.init_app(app)
# scheduler.start()

# port = get_serial_ports()[0]
# client = initialize_client(port)

# if client:
#     registers_to_read = [1, 5, 7, 9, 15, 22, 27, 28, 30, 33, 40, 43, 55, 59, 61, 67, 91, 101, 113, 200, 201, 202, 203, 204]
#     batch = [0] * len(registers_to_read)

#     @app.route('/index')
#     def index():
#         try:
#             client.write_register(1, 0, 3)
#             return "Batch updated"
#         except Exception as e:
#             print(f"Error updating batch: {e}")
#             return "Error updating batch"

#     @scheduler.task("interval", args=[client, batch], id="do_job_1", seconds=1, misfire_grace_time=900)
#     def job1(client, batch):
#         """Sample job 1."""
#         print('batch: ', batch)
#         if batch[1] == 1:
#             try:
#                 client.write_register(1, 0, 3)
#                 print("Job 1 executed")
#             except Exception as e:
#                 print(f"Error executing job 1: {e}")

#     @scheduler.task("interval", args=[client, batch], id="do_job_2", seconds=3)
#     def job2(client, batch):
#         """Sample job 2."""
#         print('batch: ', batch)
#         try:
#             data = read_registers(client, registers_to_read, 3)
#             print("Data:", data)
#             print("Job 2 executed")
#         except Exception as e:
#             print(f"Error executing job 2: {e}")

#     @scheduler.task("cron", id="do_job_3", week="*", day_of_week="sun")
#     def job3():
#         """Sample job 3."""
#         print("Job 3 executed")

#     if __name__ == "__main__":
#         app.run()
# else:
#     print("Modbus client initialization failed. Exiting.")



from flask import Flask
from flask_apscheduler import APScheduler
from pymodbus.client import ModbusSerialClient as ModbusClient
import platform
import re
import serial.tools.list_ports

def get_serial_ports():
    try:
        system_os = platform.system()
        # For Windows, use pyserial's list_ports
        ports = [port.device for port in serial.tools.list_ports.comports()]
        com_ports = []
        for port in ports:
            if system_os == 'Windows':
                match = re.match(r'COM(\d+)', port)
                if match:
                    com_ports.append(f'COM{match.group(1)}')
            elif system_os == 'Linux':
                match = re.match(r'/dev/ttyUSB(\d+)', port)
                if match:
                    com_ports.append(f'/dev/ttyUSB{match.group(1)}')
        return com_ports
    except Exception as e:
        print(f"Error fetching serial ports: {e}")
        return []

def read_registers(client, reg_addresses, slave_id):
    try:
        data = []
        for reg_address in reg_addresses:
            result = client.read_holding_registers(reg_address, 2, slave=slave_id)
            
            if result.isError():
                print(f"Error reading Modbus data for register {reg_address}: {result}")
                data.append(None)
            else:
                data.append(result.registers[0])
        return data
    except Exception as e:
        print(f"Error reading Modbus data: {e}")
        return [None] * len(reg_addresses)

def initialize_client(port):
    try:
        client = ModbusClient(method="rtu", port=port, stopbits=1, bytesize=8, parity="N", baudrate=9600)
        return client
    except Exception as e:
        print(f"Error initializing Modbus client: {e}")
        return None

class Config:
    """App configuration."""
    SCHEDULER_API_ENABLED = True

app = Flask(__name__)
app.config.from_object(Config())

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

port = get_serial_ports()[0]
client = initialize_client(port)

if client:
    # registers_to_read = [1, 5, 7, 9, 15, 22, 27, 28, 30, 33, 40, 43, 55, 59, 61, 67, 91, 101, 113, 200, 201, 202, 203, 204]
    registers_to_read = [1, 5, 7, 9, 15]
    register_names = ["pv1", "pv2", "pv3", "pv4","pv5"]
    batch = [0] * len(registers_to_read)

    @app.route('/index')
    def index():
        try:
            client.write_register(1, 0, 3)
            return "Batch updated"
        except Exception as e:
            print(f"Error updating batch: {e}")
            return "Error updating batch"

    @scheduler.task("interval", args=[client, batch], id="do_job_1", seconds=1, misfire_grace_time=900)
    def job1(client, batch):
        """Sample job 1."""
        print('batch: ', batch)
        if batch[1] == 1:
            try:
                client.write_register(1, 0, 3)
                print("Job 1 executed")
            except Exception as e:
                print(f"Error executing job 1: {e}")

    @scheduler.task("interval", args=[client, batch, register_names], id="do_job_2", seconds=3)
    def job2(client, batch, register_names):
        """Sample job 2."""
        print('batch: ', batch)
        try:
            data = read_registers(client, registers_to_read, 3)

            # reg_dict = zip(register_names, data)
            # print('reg_dict: ', reg_dict)

            res = {register_names[i]: data[i] for i in range(len(register_names))}
            
            print('res: ', res)

            print("Job 2 executed")
        except Exception as e:
            print(f"Error executing job 2: {e}")

    @scheduler.task("cron", id="do_job_3", week="*", day_of_week="sun")
    def job3():
        """Sample job 3."""
        print("Job 3 executed")

    if __name__ == "__main__":
        app.run()
else:
    print("Modbus client initialization failed. Exiting.")
