# import time
# from pyModbusTCP.client import ModbusClient

# slave_address = '192.168.1.5'
# port = 502
# unit_id = 1
# modbus_client = ModbusClient(host= slave_address, port = port, unit_id= unit_id)
# if __name__ == '__main__':
#     while True:
#         regs = modbus_client.read_input_registers(1, 20)
#         if regs:
#             print(regs)
#         else:
#             print("read error occured")
#         time.sleep(2)

import subprocess
import platform

# Get the name of the operating system.
os_name = platform.system()
# Check if the OS is Windows.
if os_name == "Windows":
    # Command to list Wi-Fi networks on Windows using netsh.
    list_networks_command = 'netsh wlan show networks'
    # Execute the command and capture the result.
    output = subprocess.check_output(
        list_networks_command, shell=True, text=True)
    # Print the output, all networks in range.
    print(output)
# Check if the OS is Linux.
elif os_name == "Linux":
    # Command to list Wi-Fi networks on Linux using nmcli.
    list_networks_command = "nmcli device wifi list"
    # Execute the command and capture the output.
    output = subprocess.check_output(
        list_networks_command, shell=True, text=True)
    # Print the output, all networks in range.
    print(output)
# Handle unsupported operating systems.
else:
    # Print a message indicating that the OS is unsupported (Not Linux or Windows).
    print("Unsupported OS")
