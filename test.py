# app.py
import subprocess
import platform

def list_wifi_networks():
    os_name = platform.system()
    if os_name == "Linux":
        list_networks_command = "sudo iwlist wlan0 scan | grep ESSID | cut -d '\"' -f 2"
    else:
        return []
    try:
        output = subprocess.check_output(list_networks_command, shell=True, text=True)
        ssids = output.splitlines()
        print('ssids: ', ssids)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        return []
