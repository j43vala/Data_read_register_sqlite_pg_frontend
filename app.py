
import time
import socket
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models

def main():
    try:
        # Check if the configuration is available
        if config is not None:
            # Get the communication port and device information from the configuration
            com_port = config["modbus"]["port"]
            print('com_port: ', com_port)
            devices = config["devices"]
            client = initialize_modbus_client()
            client.connect()
            # hostname = os.uname()[1]                   # linux
            hostname = socket.gethostname()  # windows and linux both

            # Initialize SQLite dynamic models
            create_dynamic_models(devices, hostname)

            session = get_sqlite_session()

            while True:
                time.sleep(3)
                for device in devices:
                    try:
                        # Move model creation outside of the loop
                        model = device["model"]

                        # Move record creation outside the loop
                        record = model()
                        
                        slave_id = device.get("slave_id")

                        for register in device["registers"]:
                            try:
                                column_name = register.get("column_name")

                                reg_no = register.get("address")
                                reg_type = register.get("type")
                                

                                if column_name is not None:
                                    data = read_modbus_data(client, slave_id, reg_no, reg_type)
                                   
                                    # Update the existing record instead of creating a new one
                                    setattr(record, column_name, data)
                                    print(f"Updated '{column_name}' with value: {data}")

                                else:
                                    print(f"Attribute name is missing in the specification for register {register}")
                            except Exception as e:
                                import traceback
                                traceback.print_exc()
                                print(f"An error occurred processing register {register}: {e}")

                        session.add(record)
                        session.commit()
                        device_name = device["device_name"]
                        print(f"Record committed successfully for device : '{device_name}'\n")

                    except Exception as e:
                        # import traceback
                        # traceback.print_exc()
                        print(f"An error occurred: {e}")
                        break  # Break out of the loop in case of an exception
                    
                    # finally:
                    #     client.close()  

    except KeyboardInterrupt:
        client.close()
        print("Exiting the loop .................")
if __name__ == "__main__":
    main()
