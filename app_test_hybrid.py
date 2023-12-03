
# # # ____________________________________________________________________________________________________________________
# # #data will delete while internet or  without internet according on given time period 

# import time
# import socket
# import datetime
# from config import config
# from config.db import get_sqlite_session
# from modbus_final import read_modbus_data, initialize_modbus_client
# from sqlite_final import create_dynamic_models
# from spb import init_spb_device,connect_spb_node, connect_spb_device, init_spb_edge_node
# # from spb import init_spb_device, connect_spb_device, init_spb_edge_node

# def main():
#     last_check_time = datetime.datetime.now()        
#     check_frequency_days = config.get("retention_parameter").get("check_frequency").get("days")
#     check_frequency_hours =config.get("retention_parameter").get("check_frequency").get("hours")
#     check_frequency_minutes =config.get("retention_parameter").get("check_frequency").get("minutes")
#     check_frequency_seconds = config.get("retention_parameter").get("check_frequency").get("seconds")
#     check_frequency = datetime.datetime.utcnow() - datetime.timedelta(days = check_frequency_days, hours = check_frequency_hours, minutes = check_frequency_minutes, seconds = check_frequency_seconds)

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
#             broker = config.get("mqtt").get("broker_host") 
#             port = config.get("mqtt").get("broker_port")

#             # spb_dev initialized
#             success = None  # Initialize success variable for the entire process

            

#             for device_dict in config["devices"]:
#                 init_spb_device(group_name, edge_node_id, device_dict)
#                 connect_spb_device(device_dict, broker , port )
            
#             time_sleep_minutes =config.get("time_delay").get("minutes")
#             time_sleep_seconds = config.get("time_delay").get("seconds")

#             while True:
#                 # time.sleep(minutes = time_sleep_minutes, seconds = time_sleep_seconds) 
#                 time.sleep(time_sleep_minutes * 60 + time_sleep_seconds)
#                 # print('\n\n\n\n\n\n time.sleep: ', time.sleep)



#                 for device_dict in devices:
#                     model = device_dict["model"]
#                     record = model()
#                     slave_id = device_dict.get("slave_id")
#                     spb_device = device_dict["spb_device"]
#                     # Try to connect to the broker --------------------------------------------
#                     if not device_dict["spb_device_connected"]:
#                         print("connecting to broker from while loop......")
#                         connect_spb_device(device_dict, broker, port)
                        

#                     for parameter in device_dict["parameters"]:
#                         parameter_name = parameter.get("parameter_name")
#                         reg_no = parameter.get("address")
#                         reg_data_type = parameter.get("data_type")

#                         if parameter_name is not None:
#                             try:
#                                 data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
#                                 setattr(record, parameter_name, data)
                                
#                                 if spb_device.data.get_value(parameter_name) != data:
#                                     spb_device.data.set_value(parameter_name, data)
                                
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

#                         # Data retention logic based on the success of publishing
#                         success_retention_days = config.get("retention_parameter").get("success_retention").get("days")
#                         success_retention_hours =config.get("retention_parameter").get("success_retention").get("hours")
#                         success_retention_minutes =config.get("retention_parameter").get("success_retention").get("minutes")
#                         success_retention_seconds = config.get("retention_parameter").get("success_retention").get("seconds")
#                         retention_period = datetime.datetime.utcnow() - datetime.timedelta(days = success_retention_days, hours = success_retention_hours, minutes = success_retention_minutes, seconds = success_retention_seconds)

#                         elapsed_time = datetime.datetime.now() - last_check_time

#                         if success:
#                             if elapsed_time.total_seconds() >= check_frequency.total_seconds():
#                                 last_check_time = datetime.datetime.now()
#                                 print("Check 1 min...")

#                                 # Assuming you have a timestamp in your data, modify the following code accordingly
#                                 records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()

#                                 for record in records_to_delete:
#                                     session.delete(record)

#                                 session.commit()

#                                 device_name = device_dict["device_name"]
#                                 print(f"Record committed for device: '{device_name}'\n\n")
#                         else:
#                             failure_retention_days = config.get("retention_parameter").get("failure_retention").get("days")
#                             failure_retention_hours =config.get("retention_parameter").get("failure_retention").get("hours")
#                             failure_retention_minutes =config.get("retention_parameter").get("failure_retention").get("minutes")
#                             failure_retention_seconds = config.get("retention_parameter").get("failure_retention").get("seconds")
#                             retention_period_failure = datetime.datetime.utcnow() - datetime.timedelta(days = failure_retention_days, hours = failure_retention_hours, minutes = failure_retention_minutes, seconds = failure_retention_seconds)

#                             elapsed_time = datetime.datetime.now() - last_check_time
#                             if elapsed_time.total_seconds() >= check_frequency.total_seconds():
#                                 last_check_time = datetime.datetime.now()
#                                 print("Check 2 min for failure case...")

#                                 # Assuming you have a timestamp in your data, modify the following code accordingly
#                                 records_to_delete_failure = session.query(model).filter(model.timestamp < retention_period_failure).all()

#                                 for record in records_to_delete_failure:
#                                     session.delete(record)

#                                 session.commit()

#                                 device_name = device_dict["device_name"]
#                                 print(f"Record committed for device (failure case): '{device_name}'\n\n")


#                     except Exception as e:
#                         success = False
#                         print(f"Failed to publish data to Sparkplug B: {e}")

                   
#     except KeyboardInterrupt:
#         client.close()
#         print("Exiting the loop...........")

# if __name__ == "__main__":
#     main()

# # # ____________________________________________________________________________________________________________________________
# # # when no internet connection meanwhile no data will delete 


# # # import time
# # # import socket
# # # import datetime
# # # from config import config
# # # from config.db import get_sqlite_session
# # # from modbus_final import read_modbus_data, initialize_modbus_client
# # # from sqlite_final import create_dynamic_models
# # # from spb import init_spb_device, connect_spb_device

# # # def main():
# # #     last_check_time = datetime.datetime.now()
# # #     retention_interval = 60  # Set the retention interval in seconds

# # #     try:
# # #         # check if the configuration is available or not
# # #         if config is not None:
# # #             # Get the communication port and device information from the configuration
# # #             com_port = config["modbus"]["port"]
# # #             print('com_port: ', com_port)
# # #             devices = config["devices"]
# # #             client = initialize_modbus_client()
# # #             client.connect()

# # #             # hostname = os.uname()[1]           # for linux
# # #             hostname = socket.gethostname()     # for windows

# # #             # Initialize Sqlite Dynamic Models
# # #             create_dynamic_models(devices, hostname)

# # #             session = get_sqlite_session()

# # #             # sparkplug_b configuration
# # #             group_name = config.get("spb_parameter").get("group_id")
# # #             edge_node_id = config.get("spb_parameter").get("edge_node_id")

# # #             # spb_dev initialized
# # #             success = None  # Initialize success variable for the entire process

# # #             for device_dict in config["devices"]:
# # #                 init_spb_device(group_name, edge_node_id, device_dict)
# # #                 connect_spb_device(device_dict)

# # #             while True:
# # #                 time.sleep(1.5)

# # #                 for device_dict in devices:
# # #                     model = device_dict["model"]
# # #                     record = model()
# # #                     slave_id = device_dict.get("slave_id")
# # #                     spb_device = device_dict["spb_device"]
# # #                     # Try to connect to the broker --------------------------------------------
# # #                     if not device_dict["spb_device_connected"]:
# # #                         print("connecting to broker from while loop......")
# # #                         connect_spb_device(device_dict)

# # #                     for parameter in device_dict["parameters"]:
# # #                         parameter_name = parameter.get("parameter_name")
# # #                         reg_no = parameter.get("address")
# # #                         reg_data_type = parameter.get("data_type")

# # #                         if parameter_name is not None:
# # #                             try:
# # #                                 data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
# # #                                 setattr(record, parameter_name, data)
# # #                                 spb_device.data.set_value(parameter_name, data)
# # #                                 print(f"updated '{parameter_name}' with value: {data}")
# # #                             except Exception as e:
# # #                                 success = False
# # #                                 print(f"An error occurred reading Modbus data for {parameter}: {e}")
# # #                         else:
# # #                             print(f"Attribute name is missing in the specification for parameter {parameter}")

# # #                     session.add(record)
# # #                     session.commit()

# # #                     # Attempt to publish data to Sparkplug B
# # #                     try:
# # #                         success = spb_device.publish_data()
# # #                         print('success: ', success)
# # #                     except Exception as e:
# # #                         success = False
# # #                         print(f"Failed to publish data to Sparkplug B: {e}")

# # #                     # Data retention logic based on the success of publishing
# # #                     retention_period = datetime.datetime.utcnow() - datetime.timedelta(minutes=1)
# # #                     elapsed_time = datetime.datetime.now() - last_check_time

# # #                     if success and elapsed_time.total_seconds() >= retention_interval:
# # #                         last_check_time = datetime.datetime.now()
# # #                         print("Check 1 min...")

# # #                         # Assuming you have a timestamp in your data, modify the following code accordingly
# # #                         records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()

# # #                         for record in records_to_delete:
# # #                             session.delete(record)

# # #                         session.commit()

# # #                         device_name = device_dict["device_name"]
# # #                         print(f"Record committed for device: '{device_name}'\n\n")

# # #     except KeyboardInterrupt:
# # #         client.close()
# # #         print("Exiting the loop...........")

# # # if __name__ == "__main__":
# # #     main()




# # # ____________________________________________________________________________________________________________________
# # #data will delete while internet or  without internet according on given time period 

# import time
# import socket
# import datetime
# from config import config
# from config.db import get_sqlite_session
# from modbus_final import read_modbus_data, initialize_modbus_client
# from sqlite_final import create_dynamic_models
# from spb import init_spb_device, connect_spb_device, init_spb_edge_node

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
#             broker = config.get("mqtt").get("broker_host") 
#             port = config.get("mqtt").get("broker_port")

#             # spb_dev initialized
#             success = None  # Initialize success variable for the entire process

            

#             for device_dict in config["devices"]:
#                 init_spb_device(group_name, edge_node_id, device_dict)
#                 connect_spb_device(device_dict, broker , port )


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
#                         connect_spb_device(device_dict, broker, port)
                        

#                     for parameter in device_dict["parameters"]:
#                         parameter_name = parameter.get("parameter_name")
#                         reg_no = parameter.get("address")
#                         reg_data_type = parameter.get("data_type")

#                         if parameter_name is not None:
#                             try:
#                                 data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
#                                 setattr(record, parameter_name, data)
                                
#                                 if spb_device.data.get_value(parameter_name) != data:
#                                     spb_device.data.set_value(parameter_name, data)
                                
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

#                         # Data retention logic based on the success of publishing
#                         retention_period = datetime.datetime.utcnow() - datetime.timedelta(minutes=1)
#                         elapsed_time = datetime.datetime.now() - last_check_time

#                         if success:
#                             if elapsed_time.total_seconds() >= retention_interval:
#                                 last_check_time = datetime.datetime.now()
#                                 print("Check 1 min...")

#                                 # Assuming you have a timestamp in your data, modify the following code accordingly
#                                 records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()

#                                 for record in records_to_delete:
#                                     session.delete(record)

#                                 session.commit()

#                                 device_name = device_dict["device_name"]
#                                 print(f"Record committed for device: '{device_name}'\n\n")
#                         else:
#                             retention_period_failure = datetime.datetime.utcnow() - datetime.timedelta(minutes=2)
#                             elapsed_time = datetime.datetime.now() - last_check_time
#                             if elapsed_time.total_seconds() >= retention_interval:
#                                 last_check_time = datetime.datetime.now()
#                                 print("Check 2 min for failure case...")

#                                 # Assuming you have a timestamp in your data, modify the following code accordingly
#                                 records_to_delete_failure = session.query(model).filter(model.timestamp < retention_period_failure).all()

#                                 for record in records_to_delete_failure:
#                                     session.delete(record)

#                                 session.commit()

#                                 device_name = device_dict["device_name"]
#                                 print(f"Record committed for device (failure case): '{device_name}'\n\n")


#                     except Exception as e:
#                         success = False
#                         print(f"Failed to publish data to Sparkplug B: {e}")

                   
#     except KeyboardInterrupt:
#         client.close()
#         print("Exiting the loop...........")

# if __name__ == "__main__":
#     main()



import time
import datetime
import logging
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
from spb import init_spb_device, connect_spb_device
import socket
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def validate_config(config):
    # Add validation checks for required configuration parameters
    pass

def connect_to_broker(device_dict, broker, port):
    if not device_dict["spb_device_connected"]:
        logger.info("Connecting to broker from while loop...")
        connect_spb_device(device_dict, broker, port)

def retrieve_modbus_data(client, slave_id, reg_no, reg_data_type):
    try:
        data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
        return data
    except Exception as e:
        logger.error(f"An error occurred reading Modbus data: {e}")
        return None

def publish_to_sparkplug_b(spb_device):
    try:
        success = spb_device.publish_data()
        logger.info(f"Publish success: {success}")
        return success
    except Exception as e:
        logger.error(f"Failed to publish data to Sparkplug B: {e}")
        return False

def perform_data_retention(session, model, retention_period):
    records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()
    for record in records_to_delete:
        session.delete(record)
    session.commit()

def main():
    validate_config(config)

    last_check_time = datetime.datetime.now()
    check_frequency = datetime.timedelta(
        days=config["retention_parameter"]["check_frequency"]["days"],
        hours=config["retention_parameter"]["check_frequency"]["hours"],
        minutes=config["retention_parameter"]["check_frequency"]["minutes"],
        seconds=config["retention_parameter"]["check_frequency"]["seconds"]
    )

    time_sleep_minutes = config["time_delay"]["minutes"]
    time_sleep_seconds = config["time_delay"]["seconds"]

    try:
        com_port = config["modbus"]["port"]
        devices = config["devices"]
        client = initialize_modbus_client()
        client.connect()

        hostname = socket.gethostname()

        create_dynamic_models(devices, hostname)
        session = get_sqlite_session()

        group_name = config.get("spb_parameter").get("group_id")
        edge_node_id = config.get("spb_parameter").get("edge_node_id")
        broker = config.get("mqtt").get("broker_host") 
        port = config.get("mqtt").get("broker_port")

        success = None

        for device_dict in config["devices"]:
            init_spb_device(group_name, edge_node_id, device_dict)
            connect_spb_device(device_dict, broker , port )

        while True:
            time.sleep(time_sleep_minutes * 60 + time_sleep_seconds)

            for device_dict in devices:
                model = device_dict["model"]
                record = model()
                slave_id = device_dict.get("slave_id")
                spb_device = device_dict["spb_device"]

                connect_to_broker(device_dict, broker, port)

                for parameter in device_dict["parameters"]:
                    parameter_name = parameter.get("parameter_name")
                    reg_no = parameter.get("address")
                    reg_data_type = parameter.get("data_type")

                    if parameter_name is not None:
                        data = retrieve_modbus_data(client, slave_id, reg_no, reg_data_type)
                        setattr(record, parameter_name, data)

                        if spb_device.data.get_value(parameter_name) != data:
                            spb_device.data.set_value(parameter_name, data)

                        logger.info(f"Updated '{parameter_name}' with value: {data}")
                    else:
                        logger.warning(f"Attribute name is missing in the specification for parameter {parameter}")

                session.add(record)
                session.commit()

                success = publish_to_sparkplug_b(spb_device)

                retention_period = (
                    datetime.datetime.utcnow() - datetime.timedelta(
                        days=config["retention_parameter"]["success_retention"]["days"],
                        hours=config["retention_parameter"]["success_retention"]["hours"],
                        minutes=config["retention_parameter"]["success_retention"]["minutes"],
                        seconds=config["retention_parameter"]["success_retention"]["seconds"]
                    )
                )

                if success and datetime.datetime.now() - last_check_time >= check_frequency:
                    last_check_time = datetime.datetime.now()
                    perform_data_retention(session, model, retention_period)
                    logger.info(f"Records retained for device: '{device_dict['device_name']}'")

                elif not success:
                    retention_period_failure = (
                        datetime.datetime.utcnow() - datetime.timedelta(
                            days=config["retention_parameter"]["failure_retention"]["days"],
                            hours=config["retention_parameter"]["failure_retention"]["hours"],
                            minutes=config["retention_parameter"]["failure_retention"]["minutes"],
                            seconds=config["retention_parameter"]["failure_retention"]["seconds"]
                        )
                    )

                    if datetime.datetime.now() - last_check_time >= check_frequency:
                        last_check_time = datetime.datetime.now()
                        perform_data_retention(session, model, retention_period_failure)
                        logger.info(f"Records retained for device (failure case): '{device_dict['device_name']}'")

    except KeyboardInterrupt:
        client.close()
        logger.info("Exiting the loop...........")

if __name__ == "__main__":
    main()
