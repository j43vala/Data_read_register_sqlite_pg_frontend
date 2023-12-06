import platform
import re
import serial.tools.list_ports

def get_serial_ports():
    system_os = platform.system()
    try:
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
        return str(e)





# import platform
# import subprocess
# import re
# import serial.tools.list_ports


# def get_serial_ports():
#     system_os = platform.system()
#     if system_os == 'Linux':
#         return get_linux_serial_ports()
#     elif system_os == 'Windows':
#         return get_windows_serial_ports()
#     else:
#         return f"Unsupported operating system: {system_os}"
    
# def get_linux_serial_ports():
#     try:
#         # Run ls /dev/serial/by-id/ command to list USB serial devices
#         result = subprocess.check_output(['ls', '/dev/serial/by-id/']).decode('utf-8')
#         # Extract USB serial ports based on the actual pattern
#         usb_serial_ports = []
#         for line in result.split('\n'):
#             match = re.match(r'usb-ATC_High_Speed_USB_To_RS-485_AT56GBZE-if\d+-port(\d+)', line)
#             if match:
#                 port_number = match.group(1)
#                 usb_serial_ports.append(f'/dev/ttyUSB{port_number}')
#         return usb_serial_ports
#     except Exception as e:
#         return str(e)
    
# def get_windows_serial_ports():
#     try:
#         # For Windows, use pyserial's list_ports
#         ports = [port.device for port in serial.tools.list_ports.comports()]
#         # Extract COM port numbers
#         com_ports = []
#         for port in ports:
#             match = re.match(r'COM(\d+)', port)
#             if match:
#                 com_ports.append(f'COM{match.group(1)}')
#         return com_ports
#     except Exception as e:
#         return str(e)






