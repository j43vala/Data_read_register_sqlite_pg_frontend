# import time
# import socket 
# from config import config 
# from config.db import get_sqlite_session 
# from modbus_final import read_modbus_data, initialize_modbus_client
# from sqlite_final import create_dynamic_models
# from mqtt_spb_wrapper import MqttSpbEntityDevice
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
#                                     spb_device.data.set_value(parameter_name, data)
#                                     #update the existing record insted of creating a new one 
#                                     # setattr(record, parameter_name, data)
#                                     print(f"updated'{parameter_name}' with value: {data}")
#                                 else:
#                                     print(f"Attribute name is missing in the specification for parameter {parameter}")
                                
#                             except Exception as e:
#                                 import traceback
#                                 traceback.print_exc()
#                                 print(f"An error occurred processing parameter {parameter}: {e}")
                                
#                         session.add(record)
#                         session.commit()
#                         device_name = device_dict["device_name"]
#                         spb_device.publish.data()
#                         print(f"Record Commited Sucessfully for device: '{device_name}' \n\n")

                        
                        
#                     except Exception as e:
#                         print (f"An error occured: {e}")
#     except KeyboardInterrupt:
#         client.close()
#         print("Existing the loop...........")
# if __name__ == "main":
#     main()
# # # ______________________________________________________________________
# # import time
# # import socket
# # from config import config
# # from config.db import get_sqlite_session
# # from modbus_final import read_modbus_data, initialize_modbus_client
# # from sqlite_final import create_dynamic_models
# # from mqtt_spb_wrapper import MqttSpbEntityDevice
# # from spb import init_spb_device

# # def main():
# #     try:
# #         # Check if the configuration is available
# #         if config is not None:
# #             # Get the communication port and device information from the configuration
# #             com_port = config["modbus"]["port"]
# #             print('com_port: ', com_port)
# #             devices = config["devices"]
# #             client_modbus = initialize_modbus_client()
# #             client_modbus.connect()
            
# #             # hostname = os.uname()[1]                   # linux
# #             hostname = socket.gethostname()  # windows and linux both

# #             # Initialize SQLite dynamic models
# #             create_dynamic_models(devices, hostname)

# #             # Initialize Sparkplug B parameters
# #             group_name = config.get("spb_parameter").get("group_id")
# #             edge_node_id = config.get("spb_parameter").get("edge_node_id")

# #             session = get_sqlite_session()
            
          

# #             for device_dict in config["devices"]:
# #                 # Initialize Sparkplug B device
# #                 init_spb_device(group_name, edge_node_id, device_dict)
                

# #             while True:
# #                 time.sleep(3)
# #                 for device_dict in devices:
# #                     try:
# #                         model = device_dict["model"]
# #                         record = model()
# #                         spb_device = device_dict["spb_device"]
# #                         slave_id = device_dict.get("slave_id")

# #                         for parameter in device_dict["parameters"]:
# #                             try:
# #                                 parameter_name = parameter.get("parameter_name")
# #                                 reg_no = parameter.get("address")
# #                                 reg_data_type = parameter.get("data_type")

# #                                 if parameter_name is not None:
# #                                     data = read_modbus_data(client_modbus, slave_id, reg_no, reg_data_type)
# #                                     # setattr(record, parameter_name, data)
# #                                     # print('setattr: ', setattr)
# #                                     spb_device.data.set_value(parameter_name, data)
# #                                     print(f"Updated '{parameter_name}' with value: {data}")
# #                                 else:
# #                                     print(f"Attribute name is missing in the specification for parameter {parameter}")
# #                             except Exception as e:
# #                                 import traceback
# #                                 traceback.print_exc()
# #                                 print(f"An error occurred processing parameter {parameter}: {e}")

# #                         session.add(record)
# #                         session.commit()
# #                         spb_device.publish_data()
# #                         device_name = device_dict["device_name"]
# #                         print(f"Record committed successfully for device: '{device_name}'\n")

# #                     except Exception as e:
# #                         import traceback
# #                         traceback.print_exc()
# #                         print(f"An error occurred: {e}")
# #                         break  # Break out of the loop in case of an exception

# #     except KeyboardInterrupt:
# #         print("Exiting the loop .................")

# # if __name__ == "__main__":
# #     main()
import time
import socket 
from config import config 
from config.db import get_sqlite_session 
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
from mqtt_spb_wrapper import MqttSpbEntityDevice
from spb import init_spb_device

def main():
    try:
        # check if the configuration is available or not 
        if config is not None:
            #Get the communication port and device information from the configuration 
            com_port = config["modbus"]["port"]
            print('com_port: ', com_port)
            devices = config["devices"]
            client = initialize_modbus_client()
            client.connect()

            #hostname = os.uname()[1]           # for linux 
            hostname = socket.gethostname()     # for windows

            #Initialize Sqlite Dynamic Models 
            create_dynamic_models(devices, hostname)

            session = get_sqlite_session()

            #sparkplug_b configureation 
            group_name = config.get("spb_parameter").get("group_id")
            edge_node_id = config.get("spb_parameter").get("edge_node_id")

            #spb_dev initilized
            for device_dict in config["devices"]:
                init_spb_device(group_name, edge_node_id, device_dict)

            while True:
                time.sleep(3)
                for device_dict in devices:
                    try:
                        model = device_dict["model"]
                        record = model()
                        slave_id = device_dict.get("slave_id")
                        spb_device = device_dict["spb_device"]

                        for parameter in device_dict["parameters"]:
                            try:
                                parameter_name = parameter.get("parameter_name")
                                reg_no = parameter.get("address")
                                reg_data_type = parameter.get("data_type")

                                if parameter_name is not None:
                                    data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
                                    spb_device.data.set_value(parameter_name, data)
                                    print(f"updated '{parameter_name}' with value: {data}")
                                else:
                                    print(f"Attribute name is missing in the specification for parameter {parameter}")

                            except Exception as e:
                                import traceback
                                traceback.print_exc()
                                print(f"An error occurred processing parameter {parameter}: {e}")

                        session.add(record)
                        session.commit()
                        device_name = device_dict["device_name"]
                        spb_device.publish_data()  # Fixed typo here
                        print(f"Record Committed Successfully for device: '{device_name}' \n\n")

                    except Exception as e:
                        print(f"An error occurred: {e}")

    except KeyboardInterrupt:
        client.close()
        print("Exiting the loop...........")

if __name__ == "__main__":  # Fixed typo here
    main()