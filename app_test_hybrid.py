
# # ____________________________________________________________________________________________________________________
# #data will delete while internet or  without internet according on given time period 

import time
import socket
import datetime
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
from spb import init_spb_device, connect_spb_device

def main():
    last_check_time = datetime.datetime.now()
    retention_interval = 60  # Set the retention interval in seconds

    try:
        # check if the configuration is available or not
        if config is not None:
            # Get the communication port and device information from the configuration
            com_port = config["modbus"]["port"]
            print('com_port: ', com_port)
            devices = config["devices"]
            client = initialize_modbus_client()
            client.connect()


            # hostname = os.uname()[1]           # for linux
            hostname = socket.gethostname()     # for windows

            # Initialize Sqlite Dynamic Models
            create_dynamic_models(devices, hostname)

            session = get_sqlite_session()

            # sparkplug_b configuration
            group_name = config.get("spb_parameter").get("group_id")
            edge_node_id = config.get("spb_parameter").get("edge_node_id")
            broker = config.get("mqtt").get("broker_host") 
            port = config.get("mqtt").get("broker_port")

            # spb_dev initialized
            success = None  # Initialize success variable for the entire process

            for device_dict in config["devices"]:
                init_spb_device(group_name, edge_node_id, device_dict)
                connect_spb_device(device_dict, broker , port )


            while True:
                time.sleep(1.5)

                for device_dict in devices:
                    model = device_dict["model"]
                    record = model()
                    slave_id = device_dict.get("slave_id")
                    spb_device = device_dict["spb_device"]
                    # Try to connect to the broker --------------------------------------------
                    if not device_dict["spb_device_connected"]:
                        print("connecting to broker from while loop......")
                        connect_spb_device(device_dict, broker, port)
                        

                    for parameter in device_dict["parameters"]:
                        parameter_name = parameter.get("parameter_name")
                        reg_no = parameter.get("address")
                        reg_data_type = parameter.get("data_type")

                        if parameter_name is not None:
                            try:
                                data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
                                setattr(record, parameter_name, data)
                                
                                if spb_device.data.get_value(parameter_name) != data:
                                    spb_device.data.set_value(parameter_name, data)
                                
                                print(f"updated '{parameter_name}' with value: {data}")
                            except Exception as e:
                                success = False
                                print(f"An error occurred reading Modbus data for {parameter}: {e}")
                        else:
                            print(f"Attribute name is missing in the specification for parameter {parameter}")

                    session.add(record)
                    session.commit()

                    # Attempt to publish data to Sparkplug B
                    try:
                        success = spb_device.publish_data()
                        print('success: ', success)

                        # Data retention logic based on the success of publishing
                        retention_period = datetime.datetime.utcnow() - datetime.timedelta(minutes=1)
                        elapsed_time = datetime.datetime.now() - last_check_time

                        if success:
                            if elapsed_time.total_seconds() >= retention_interval:
                                last_check_time = datetime.datetime.now()
                                print("Check 1 min...")

                                # Assuming you have a timestamp in your data, modify the following code accordingly
                                records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()

                                for record in records_to_delete:
                                    session.delete(record)

                                session.commit()

                                device_name = device_dict["device_name"]
                                print(f"Record committed for device: '{device_name}'\n\n")
                        else:
                            retention_period_failure = datetime.datetime.utcnow() - datetime.timedelta(minutes=2)
                            elapsed_time = datetime.datetime.now() - last_check_time
                            if elapsed_time.total_seconds() >= retention_interval:
                                last_check_time = datetime.datetime.now()
                                print("Check 2 min for failure case...")

                                # Assuming you have a timestamp in your data, modify the following code accordingly
                                records_to_delete_failure = session.query(model).filter(model.timestamp < retention_period_failure).all()

                                for record in records_to_delete_failure:
                                    session.delete(record)

                                session.commit()

                                device_name = device_dict["device_name"]
                                print(f"Record committed for device (failure case): '{device_name}'\n\n")


                    except Exception as e:
                        success = False
                        print(f"Failed to publish data to Sparkplug B: {e}")

                   
    except KeyboardInterrupt:
        client.close()
        print("Exiting the loop...........")

if __name__ == "__main__":
    main()

# ____________________________________________________________________________________________________________________________
# when no internet connection meanwhile no data will delete 


# import time
# import socket
# import datetime
# from config import config
# from config.db import get_sqlite_session
# from modbus_final import read_modbus_data, initialize_modbus_client
# from sqlite_final import create_dynamic_models
# from spb import init_spb_device, connect_spb_device

# def main():
#     last_check_time = datetime.datetime.now()
#     retention_interval = 60  # Set the retention interval in seconds

#     try:
#         # check if the configuration is available or not
#         if config is not None:
#             # Get the communication port and device information from the configuration
#             com_port = config["modbus"]["port"]
#             print('com_port: ', com_port)
#             devices = config["devices"]
#             client = initialize_modbus_client()
#             client.connect()

#             # hostname = os.uname()[1]           # for linux
#             hostname = socket.gethostname()     # for windows

#             # Initialize Sqlite Dynamic Models
#             create_dynamic_models(devices, hostname)

#             session = get_sqlite_session()

#             # sparkplug_b configuration
#             group_name = config.get("spb_parameter").get("group_id")
#             edge_node_id = config.get("spb_parameter").get("edge_node_id")

#             # spb_dev initialized
#             success = None  # Initialize success variable for the entire process

#             for device_dict in config["devices"]:
#                 init_spb_device(group_name, edge_node_id, device_dict)
#                 connect_spb_device(device_dict)

#             while True:
#                 time.sleep(1.5)

#                 for device_dict in devices:
#                     model = device_dict["model"]
#                     record = model()
#                     slave_id = device_dict.get("slave_id")
#                     spb_device = device_dict["spb_device"]
#                     # Try to connect to the broker --------------------------------------------
#                     if not device_dict["spb_device_connected"]:
#                         print("connecting to broker from while loop......")
#                         connect_spb_device(device_dict)

#                     for parameter in device_dict["parameters"]:
#                         parameter_name = parameter.get("parameter_name")
#                         reg_no = parameter.get("address")
#                         reg_data_type = parameter.get("data_type")

#                         if parameter_name is not None:
#                             try:
#                                 data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
#                                 setattr(record, parameter_name, data)
#                                 spb_device.data.set_value(parameter_name, data)
#                                 print(f"updated '{parameter_name}' with value: {data}")
#                             except Exception as e:
#                                 success = False
#                                 print(f"An error occurred reading Modbus data for {parameter}: {e}")
#                         else:
#                             print(f"Attribute name is missing in the specification for parameter {parameter}")

#                     session.add(record)
#                     session.commit()

#                     # Attempt to publish data to Sparkplug B
#                     try:
#                         success = spb_device.publish_data()
#                         print('success: ', success)
#                     except Exception as e:
#                         success = False
#                         print(f"Failed to publish data to Sparkplug B: {e}")

#                     # Data retention logic based on the success of publishing
#                     retention_period = datetime.datetime.utcnow() - datetime.timedelta(minutes=1)
#                     elapsed_time = datetime.datetime.now() - last_check_time

#                     if success and elapsed_time.total_seconds() >= retention_interval:
#                         last_check_time = datetime.datetime.now()
#                         print("Check 1 min...")

#                         # Assuming you have a timestamp in your data, modify the following code accordingly
#                         records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()

#                         for record in records_to_delete:
#                             session.delete(record)

#                         session.commit()

#                         device_name = device_dict["device_name"]
#                         print(f"Record committed for device: '{device_name}'\n\n")

#     except KeyboardInterrupt:
#         client.close()
#         print("Exiting the loop...........")

# if __name__ == "__main__":
#     main()
