import time
import socket
from config import config
from modbus_final import read_modbus_data, initialize_modbus_client

def read_modbus_parameters(client, devices):
    while True:
        time.sleep(3)
        for device_dict in devices:
            try:
                slave_id = device_dict.get("slave_id")

                for parameter in device_dict["parameters"]:
                    try:
                        parameter_name = parameter.get("parameter_name")
                        reg_no = parameter.get("address")
                        reg_data_type = parameter.get("data_type")

                        if parameter_name is not None:
                            data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
                            print(f"Device: {device_dict['device_name']}, Parameter: {parameter_name}, Value: {data}")
                        else:
                            print(f"Attribute name is missing in the specification for parameter {parameter}")
                    except Exception as e:
                        print(f"An error occurred processing parameter {parameter}: {e}")

            except Exception as e:
                print(f"An error occurred: {e}")
                break

def main():
    try:
        if config is not None:
            com_port = config["modbus"]["port"]
            devices = config["devices"]
            client = initialize_modbus_client()
            client.connect()
            hostname = socket.gethostname()

            read_modbus_parameters(client, devices)

    except KeyboardInterrupt:
        client.close()
        print("Exiting the loop .................")

if __name__ == "__main__":
    main()
