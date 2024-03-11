import subprocess

def wireguard_service_up(interface='wg0'):
    command = ['sudo', 'wg-quick', 'up', interface]
    try:
        subprocess.run(command, check=True)
        print(f"WireGuard interface '{interface}' started successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: Failed to start WireGuard interface '{interface}'.")
        print("Error message:", e)

def wireguard_service_down(interface='wg0'):
    command = ['sudo', 'wg-quick', 'down', interface]
    try:
        subprocess.run(command, check=True)
        print(f"WireGuard interface '{interface}' stopped successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: Failed to stop WireGuard interface '{interface}'.")
        print("Error message:", e)

# Example usage:
wireguard_service_up()  # Start the WireGuard interface
wireguard_service_down()  # Stop the WireGuard interface
