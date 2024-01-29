from flask_restx import Resource, Namespace, fields
from flask import jsonify, make_response, request
import subprocess
import platform
import shlex

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
        # os_name = platform.system()

        # # Check if the OS is Windows.
        # if os_name == "Windows":
        #     # Command to list Wi-Fi networks on Windows using netsh.
        #     list_networks_command = 'netsh wlan show networks mode=Bssid'
        # # Check if the OS is Linux.
        # elif os_name == "Linux":
        #     # Command to list Wi-Fi networks on Linux using nmcli.
        #     list_networks_command = "nmcli --fields SSID device wifi list"
        # # Handle unsupported operating systems.
        # else:
        #     # Print a message indicating that the OS is unsupported (Not Linux or Windows).
        #     print("Unsupported OS")
        #     return

        # try:
        #     # Execute the command and capture the result.
        #     output = subprocess.check_output(list_networks_command, shell=True, text=True)

        #     # Parse the output and extract SSIDs.
        #     ssids = []
        #     lines = output.splitlines()
        #     header = lines[0].split()
        #     for line in lines[1:]:
        #         values = line.split()
        #         if "SSID" in header:
        #             ssid_index = header.index("SSID")
        #             ssid = values[ssid_index]
        #             ssids.append(ssid)
        #             # Return the list of network names.
        #     status = 1
        #     return make_response(jsonify({"status": status, 'ssids': ssids}), 200)
        #     # print('ssids: ', ssids)


        # except subprocess.CalledProcessError as e:
        #     print(f"Error executing command: {e}")
        
# ---------------------------------------------------------------------------------------------------------------------------------
        # os_name = platform.system()
        # if os_name == "Linux":
        #     list_networks_command = "sudo iwlist wlan0 scan | grep ESSID | cut -d '\"' -f 2"
        # else:
        #     return []
        # try:
        #     output = subprocess.check_output(list_networks_command, shell=True, text=True)
        #     ssids = output.splitlines()
        #     # return ssids
        # except subprocess.CalledProcessError as e:
        #     print(f"Error executing command: {e}")
            
        # status = 1
        # return make_response(jsonify({"status": status, 'ssids': ssids}), 200)
        
# -----------------------------------------------------------------------------------------------------------------------------------
        os_name = platform.system()

        if os_name == "Windows":
            list_networks_command = 'netsh wlan show networks mode=Bssid'
        elif os_name == "Linux":
            if platform.machine().startswith('arm') or 'raspberry' in platform.machine().lower():
                # Raspberry Pi/Linux specific command
                list_networks_command = "sudo iwlist wlan0 scan | grep ESSID | cut -d '\"' -f 2"
            else:
                # Generic Linux command
                list_networks_command = "nmcli --fields SSID device wifi list"
        else:
            # Unsupported OS
            print("Unsupported OS")
            return make_response(jsonify({"status": 0, 'error': 'Unsupported OS'}), 400)

        try:
            output = subprocess.check_output(list_networks_command, shell=True, text=True)

            ssids = []
            lines = output.splitlines()

            if os_name == "Windows":
                # Parse the output for Windows
                header = lines[0].split()
                for line in lines[1:]:
                    values = line.split()
                    if "SSID" in header:
                        ssid_index = header.index("SSID")
                        ssid = values[ssid_index].strip()  # Strip leading/trailing whitespaces
                        ssids.append(ssid)
            elif os_name == "Linux":
                # Parse the output for Linux
                ssids = [ssid.strip() for ssid in lines if ssid.strip() != "SSID"]  # Exclude "SSID" from the list

            status = 1
            return make_response(jsonify({"status": status, 'ssids': ssids}), 200)

        except subprocess.CalledProcessError as e:
            print(f"Error executing command: {e}")
            return make_response(jsonify({"status": 0, 'error': f"Error executing command: {e}"}), 500)
    


@ns.route("/connect-network")
class ConnectWifi(Resource):
    @ns.doc("connect_network")
    @ns.expect(ns.model("WiFiCredentials", {
        "ssid": fields.String(required=True, description="WiFi SSID"),
        "password": fields.String(required=True, description="WiFi Password"),
    }))
    def post(self):
        """Set Wifi And Password."""
        
         


@ns.route("/get-connected-network")
class ConnectedWifi(Resource):
    def get(self):
        """Find Which Wifi network I Connected."""
        try:
            result = subprocess.check_output(['iwgetid', '-r'], text=True)
            return result.strip()
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")
            return None
                
        
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
        