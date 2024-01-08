from flask import Flask, jsonify
import subprocess
import re

app = Flask(__name__)

def get_usb_serial_ports():
    try:
        # Run ls /dev/serial/by-id/ command to list USB serial devices
        result = subprocess.check_output(['ls', '/dev/serial/by-id/']).decode('utf-8')
        
        # Extract USB serial ports based on the actual pattern
        usb_serial_ports = []
        for line in result.split('\n'):
            match = re.match(r'usb-ATC_High_Speed_USB_To_RS-485_AT56GBZE-if\d+-port(\d+)', line)
            if match:
                port_number = match.group(1)
                usb_serial_ports.append(f'/dev/ttyUSB{port_number}')

        return usb_serial_ports
    except Exception as e:
        return str(e)

@app.route('/get_usb_serial_ports', methods=['GET'])
def get_usb_serial_ports_route():
    usb_serial_ports = get_usb_serial_ports()
    
    if isinstance(usb_serial_ports, list):
        return jsonify({'usb_serial_ports': usb_serial_ports})
    else:
        return jsonify({'error': usb_serial_ports})

if __name__ == '__main__':
    app.run(debug=True)
