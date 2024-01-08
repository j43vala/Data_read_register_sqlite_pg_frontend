<<<<<<< Updated upstream
import time
import socket
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
# from sparkplug_b_final import create_dynamic_spb_devices

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
                for device_dict in devices:
                    try:
                        # Move model creation outside of the loop
                        model = device_dict["model"]

                        # Move record creation outside the loop
                        record = model()
                        
                        
                        slave_id = device_dict.get("slave_id")

                        for parameter in device_dict["parameters"]:
                            try:
                                parameter_name = parameter.get("parameter_name")

                                reg_no = parameter.get("address")
                                reg_data_type = parameter.get("data_type")

                                if parameter_name is not None:
                                    data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
                                   
                                    # Update the existing record instead of creating a new one
                                    setattr(record, parameter_name, data)
                                    print(f"Updated '{parameter_name}' with value: {data}")

                                else:
                                    print(f"Attribute name is missing in the specification for parameter {parameter}")
                            except Exception as e:
                                import traceback
                                traceback.print_exc()
                                print(f"An error occurred processing parameter {parameter}: {e}")

                        session.add(record)
                        session.commit()
                        device_name = device_dict["device_name"]
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
=======
import time
import socket
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
# from sparkplug_b_final import create_dynamic_spb_devices

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
                for device_dict in devices:
                    try:
                        # Move model creation outside of the loop
                        model = device_dict["model"]

                        # Move record creation outside the loop
                        record = model()
                        
                        
                        slave_id = device_dict.get("slave_id")

                        for parameter in device_dict["parameters"]:
                            try:
                                parameter_name = parameter.get("parameter_name")

                                reg_no = parameter.get("address")
                                reg_data_type = parameter.get("data_type")

                                if parameter_name is not None:
                                    data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
                                   
                                    # Update the existing record instead of creating a new one
                                    setattr(record, parameter_name, data)
                                    print(f"Updated '{parameter_name}' with value: {data}")

                                else:
                                    print(f"Attribute name is missing in the specification for parameter {parameter}")
                            except Exception as e:
                                import traceback
                                traceback.print_exc()
                                print(f"An error occurred processing parameter {parameter}: {e}")

                        session.add(record)
                        session.commit()
                        device_name = device_dict["device_name"]
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
>>>>>>> Stashed changes
