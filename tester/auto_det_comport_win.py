
'''
----
Note
---------

netstat -ano | find "5000"


taskkill /F /PID -----TCP

'''



from flask import Flask, jsonify
import serial.tools.list_ports
import re

app = Flask(__name__)

def get_windows_serial_ports():
    try:
        # For Windows, use pyserial's list_ports
        ports = [port.device for port in serial.tools.list_ports.comports()]
        
        # Extract COM port numbers
        com_ports = []
        for port in ports:
            match = re.match(r'COM(\d+)', port)
            if match:
                com_ports.append(f'COM{match.group(1)}')

        return com_ports
    except Exception as e:
        return str(e)

@app.route('/get_serial_ports/windows', methods=['GET'])
def get_windows_serial_ports_route():
    serial_ports = get_windows_serial_ports()

    if isinstance(serial_ports, list):
        return jsonify({'serial_ports': serial_ports})
    else:
        return jsonify({'error': serial_ports})

if __name__ == '__main__':
    app.run(debug=True)


