import subprocess

def netbird_up():
    command = ['netbird','up']
    try:
        subprocess.run(command, check=True)
        print(f"netbird interface started successfully.")  # Print when service is up
    except subprocess.CalledProcessError as e:
        print("Error message:", e)
def netbird_down():
    command = ['netbird','down']
    try:
        subprocess.run(command, check=True)
        print(f"netbird interface stopped successfully.")  # Print when service is down
    except subprocess.CalledProcessError as e:
        print("Error message:", e)

# Example usage:
netbird_up()  # Start the WireGuard interface
netbird_down()  # Stop the WireGuard interface
