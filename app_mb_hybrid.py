# #------------------------------------------------------- 
# #   SQLITE  +  SPARKPLUG_B 
# #------------------------------------------------------- 
 
# import time
# import socket 
# from config import config 
# from config.db import get_sqlite_session 
# from modbus_final import read_modbus_data, initialize_modbus_client
# from sqlite_final import create_dynamic_models 
# from spb import init_spb_device

# def main():
#     try:
#         # check if the configuration is available or not 
#         if config is not None:
#             #Get the communication port and device information from the configuration 
#             com_port = config["modbus"]["port"]
#             print('com_port: ', com_port)
#             devices = config["devices"]
#             client = initialize_modbus_client()
#             client.connect()

#             #hostname = os.uname()[1]           # for linux 
#             hostname = socket.gethostname()     # for windows

#             #Initialize Sqlite Dynamic Models 
#             create_dynamic_models(devices, hostname)

#             session = get_sqlite_session()

#             #sparkplug_b configureation 
#             group_name = config.get("spb_parameter").get("group_id")
#             edge_node_id = config.get("spb_parameter").get("edge_node_id")

#             #spb_dev initilized
#             for device_dict in config["devices"]:
#                 init_spb_device(group_name, edge_node_id, device_dict)

#             while True:
#                 time.sleep(3)
#                 for device_dict in devices:
#                     try:
#                         model = device_dict["model"]
#                         record = model()
#                         slave_id = device_dict.get("slave_id")
#                         spb_device = device_dict["spb_device"]

#                         for parameter in device_dict["parameters"]:
#                             try:
#                                 parameter_name = parameter.get("parameter_name")
#                                 reg_no = parameter.get("address")
#                                 reg_data_type = parameter.get("data_type")

#                                 if parameter_name is not None:
#                                     data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
#                                     setattr(record, parameter_name, data)
#                                     spb_device.data.set_value(parameter_name, data)
#                                     print(f"updated '{parameter_name}' with value: {data}")
#                                 else:
#                                     print(f"Attribute name is missing in the specification for parameter {parameter}")

#                             except Exception as e:
#                                 import traceback
#                                 traceback.print_exc()
#                                 print(f"An error occurred processing parameter {parameter}: {e}")

#                         session.add(record)
#                         session.commit()
#                         spb_device.publish_data()  # Fixed typo here
#                         device_name = device_dict["device_name"]
#                         print(f"Record Committed Successfully for device: '{device_name}' \n\n")

#                     except Exception as e:
#                         print(f"An error occurred: {e}")
#                         break

#     except KeyboardInterrupt:
#         client.close()
#         print("Exiting the loop...........")

# if __name__ == "__main__":  # Fixed typo here
#     main()

import time
import socket
import datetime
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
from spb import init_spb_device,connect_spb_node, connect_spb_device, init_spb_edge_node

def main():
    last_check_time = datetime.datetime.now()
    check_frequency = datetime.datetime.utcnow() - datetime.timedelta(days = check_frequency_days, hours = check_frequency_hours, minutes = check_frequency_minutes, seconds = check_frequency_seconds)
    check_frequency_days = config.get("retention_parameter").get("check_frequency").get("days")
    check_frequency_hours =config.get("retention_parameter").get("check_frequency").get("hours")
    check_frequency_minutes =config.get("retention_parameter").get("check_frequency").get("minutes")
    check_frequency_seconds = config.get("retention_parameter").get("check_frequency").get("seconds")

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
            group_id = config.get("spb_parameter").get("group_id")
            edge_node_id = config.get("spb_parameter").get("edge_node_id")
            broker = config.get("mqtt").get("broker_host") 
            port = config.get("mqtt").get("broker_port")

            # spb_dev initialized
            success = None  # Initialize success variable for the entire process

            
            init_spb_edge_node(group_id , edge_node_id, config)
            connect_spb_node(config, broker , port )
            print(config)

            for device_dict in config["devices"]:
                init_spb_device(group_id, edge_node_id, device_dict)
                connect_spb_device(device_dict, broker , port )

            time_sleep_minutes =config.get("retention_parameter").get("time_delay").get("minutes")
            time_sleep_seconds = config.get("retention_parameter").get("time_delay").get("seconds")

            while True:
                time.sleep(minutes = time_sleep_minutes, seconds = time_sleep_seconds) 

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

                        retention_period = datetime.datetime.utcnow() - datetime.timedelta(days = success_retention_days, hours = success_retention_hours, minutes = success_retention_minutes, seconds = success_retention_seconds)
                        success_retention_days = config.get("retention_parameter").get("success_retention").get("days")
                        success_retention_hours =config.get("retention_parameter").get("success_retention").get("hours")
                        success_retention_minutes =config.get("retention_parameter").get("success_retention").get("minutes")
                        success_retention_seconds = config.get("retention_parameter").get("success_retention").get("seconds")

                        elapsed_time = datetime.datetime.now() - last_check_time

                        if success:
                            if elapsed_time.total_seconds() >= check_frequency:
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
                            retention_period_failure = datetime.datetime.utcnow() - datetime.timedelta(days = failure_retention_days, hours = failure_retention_hours, minutes = failure_retention_minutes, seconds = failure_retention_seconds)
                            failure_retention_days = config.get("retention_parameter").get("failure_retention").get("days")
                            failure_retention_hours =config.get("retention_parameter").get("failure_retention").get("hours")
                            failure_retention_minutes =config.get("retention_parameter").get("failure_retention").get("minutes")
                            failure_retention_seconds = config.get("retention_parameter").get("failure_retention").get("seconds")

                            elapsed_time = datetime.datetime.now() - last_check_time
                            if elapsed_time.total_seconds() >= check_frequency:
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
