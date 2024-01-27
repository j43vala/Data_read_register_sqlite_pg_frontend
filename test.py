# app.py
import subprocess
import platform
import os
from flask import Flask, render_template, request
app = Flask(__name__)
CONFIG_FILE_PATH = "/etc/wpa_supplicant/wpa_supplicant.conf"
def list_wifi_networks():
    os_name = platform.system()
    if os_name == "Linux":
        list_networks_command = "sudo iwlist wlan0 scan | grep ESSID | cut -d '\"' -f 2"
    else:
        return []
    try:
        output = subprocess.check_output(list_networks_command, shell=True, text=True)
        ssids = output.splitlines()
        return ssids
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        return []
@app.route("/")
def index():
    networks = list_wifi_networks()
    return render_template("index.html", networks=networks)
@app.route("/connect_network", methods=["POST"])
def connect_network():
    ssid = request.form["ssid"]
    password = request.form["password"]
    # Perform validation on the password
    if not is_valid_password(password):
        return "Invalid password. Connection failed."
    config_file_path = "/etc/wpa_supplicant/wpa_supplicant.conf"
    try:
        # Update the wpa_supplicant.conf file
        with open(config_file_path, "a") as config_file:
            config_file.write(f'network={{\n    ssid="{ssid}"\n    psk="{password}"\n}}\n')
        # Restart wpa_supplicant to apply changes
        restart_command = ["sudo", "systemctl", "restart", "wpa_supplicant"]
        subprocess.run(restart_command, check=True)
        return "Connection successful!"
    except Exception as e:
        return f"Connection failed: {e}"
def is_valid_password(password):
    # Add your password validation logic here
    # For example, check if the password meets certain criteria (length, complexity, etc.)
    return len(password) >= 8  # Placeholder validation, adjust as needed
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
