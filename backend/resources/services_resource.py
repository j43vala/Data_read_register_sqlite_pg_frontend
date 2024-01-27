from flask_restx import Resource, Namespace, fields
from flask import jsonify, make_response, request
import subprocess
import platform


ns = Namespace('Services', description='Services related operations')


@ns.route('/restart-services')
class RestartService(Resource):
    def get(self):
        try:
            # Run 'systemctl daemon-reload' to reload units
            subprocess.run(['sudo', 'systemctl', 'restart', 'app_mb_hybrid.service'], check=True)
            # subprocess.run(['sc', 'restart', 'app_mb_hybrid'], check=True)
            return 'Services restarted successfully'
        except subprocess.CalledProcessError as e:
            return f'Error restarting services: {str(e)}'
        
        
@ns.route('/stop-services')
class StopService(Resource):
    def get(self):
        try:
            subprocess.run(['sudo', 'systemctl', 'stop', 'app_mb_hybrid.service'], check=True)
            # subprocess.run(['sc', 'stop', 'app_mb_hybrid'], check=True)
            return 'Services stopped successfully'
        except subprocess.CalledProcessError as e:
            return f'Error stopping services: {str(e)}'
        
        

@ns.route('/get-wifi-lists')
class Wifi(Resource):
    def get(self):
        """Retrieve all Wifi SSID In List."""
        status = 0
        # Get the name of the operating system.
        os_name = platform.system()

        # Check if the OS is Windows.
        if os_name == "Windows":
            # Command to list Wi-Fi networks on Windows using netsh.
            list_networks_command = 'netsh wlan show networks mode=Bssid'
        # Check if the OS is Linux.
        elif os_name == "Linux":
            # Command to list Wi-Fi networks on Linux using nmcli.
            list_networks_command = "nmcli --fields SSID device wifi list"
        # Handle unsupported operating systems.
        else:
            # Print a message indicating that the OS is unsupported (Not Linux or Windows).
            print("Unsupported OS")
            return

        try:
            # Execute the command and capture the result.
            output = subprocess.check_output(list_networks_command, shell=True, text=True)

            # Parse the output and extract SSIDs.
            ssids = []
            lines = output.splitlines()
            header = lines[0].split()
            for line in lines[1:]:
                values = line.split()
                if "SSID" in header:
                    ssid_index = header.index("SSID")
                    ssid = values[ssid_index]
                    ssids.append(ssid)
                    # Return the list of network names.
            status = 1
            return make_response(jsonify({"status": status, 'ssids': ssids}), 200)
            # print('ssids: ', ssids)


        except subprocess.CalledProcessError as e:
            print(f"Error executing command: {e}")
    

# CONFIG_FILE_PATH = "/etc/wpa_supplicant/wpa_supplicant.conf"

def is_valid_password(password):
        # Add your password validation logic here
        # For example, check if the password meets certain criteria (length, complexity, etc.)
        return len(password) >= 8  # Placeholder validation, adjust as needed

@ns.route("/connect_network")
class ConnectWifi(Resource):
    def post(self):
        """Set Wifi And Password."""

        try:
            # Get data from the request
            ssid = request.form.get("ssid")
            print('ssid: ', ssid)
            password = request.form.get("password")
            print('password: ', password)

            # Validate the password
            if not is_valid_password(password):
                return "Invalid password. Connection failed."

            # Specify the path to the wpa_supplicant.conf file
            config_file_path = "/etc/wpa_supplicant/wpa_supplicant.conf"

            # Update the wpa_supplicant.conf file
            with open(config_file_path, "a") as config_file:
                config_file.write(f'network={{\n    ssid="{ssid}"\n    psk="{password}"\n}}\n')

            # Restart wpa_supplicant to apply changes
            restart_command = ["sudo", "systemctl", "restart", "wpa_supplicant"]
            subprocess.run(restart_command, check=True)

            return "Connection successful!"

        except Exception as e:
            # Log the exception for debugging purposes
            print(f"Connection failed: {e}")

            # Return an error message to the client
            return "Connection failed. Please check the server logs for more details."
        
                
        
# import subprocess
# import platform

# def list_wifi_networks():
#     # Get the name of the operating system.
#     os_name = platform.system()

#     # Check if the OS is Windows.
#     if os_name == "Windows":
#         # Command to list Wi-Fi networks on Windows using netsh.
#         list_networks_command = 'netsh wlan show networks'
#     # Check if the OS is Linux.
#     elif os_name == "Linux":
#         # Command to list Wi-Fi networks on Linux using nmcli.
#         list_networks_command = "nmcli device wifi list"
#     # Handle unsupported operating systems.
#     else:
#         # Print a message indicating that the OS is unsupported (Not Linux or Windows).
#         print("Unsupported OS")
#         return

#     try:
#         # Execute the command and capture the result.
#         output = subprocess.check_output(list_networks_command, shell=True, text=True)
#         # Print the output, all networks in range.
#         print(output)
#     except subprocess.CalledProcessError as e:
#         print(f"Error executing command: {e}")
        