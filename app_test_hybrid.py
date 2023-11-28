# import time
# import socket
# import datetime
# from config import config
# from config.db import get_sqlite_session
# from modbus_final import read_modbus_data, initialize_modbus_client
# from sqlite_final import create_dynamic_models
# from spb import init_spb_device


# def main():
#     try:
#         if config is not None:
#             com_port = config["modbus"]["port"]
#             print('com_port: ', com_port)
#             devices = config["devices"]
#             client = initialize_modbus_client()
#             client.connect()

#             hostname = socket.gethostname()

#             create_dynamic_models(devices, hostname)

#             session = get_sqlite_session()

#             group_name = config.get("spb_parameter").get("group_id")
#             edge_node_id = config.get("spb_parameter").get("edge_node_id")

#             for device_dict in config["devices"]:
#                 init_spb_device(group_name, edge_node_id, device_dict)

#             while True:
#                 try:
#                     time.sleep(3)

#                     for device_dict in devices:
#                         try:
#                             model = device_dict["model"]
#                             record = model()
#                             slave_id = device_dict.get("slave_id")
#                             spb_device = device_dict["spb_device"]
#                             device_name = device_dict["device_name"]

#                             for parameter in device_dict["parameters"]:
#                                 try:
#                                     parameter_name = parameter.get("parameter_name")
#                                     reg_no = parameter.get("address")
#                                     reg_data_type = parameter.get("data_type")

#                                     if parameter_name is not None:
#                                         data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
#                                         setattr(record, parameter_name, data)
#                                         spb_device.data.set_value(parameter_name, data)
#                                         print(f"Updated '{parameter_name}' with value: {data}")
#                                     else:
#                                         print(f"Attribute name is missing in the specification for parameter {parameter}")

#                                 except Exception as e:
#                                     import traceback
#                                     traceback.print_exc()
#                                     print(f"An error occurred processing parameter {parameter}: {e}")

#                             session.add(record)
#                             session.commit()
#                             spb_device.publish_data()
#                             print(f"Record Committed Successfully for device: '{device_name}'")

#                             current_timestamp = datetime.datetime.utcnow()

#                             sparkplug_retention_period = current_timestamp - datetime.timedelta(seconds=7)
#                             no_sparkplug_retention_period = current_timestamp - datetime.timedelta(seconds=20)

#                             data_sent_to_sparkplug = spb_device.is_data_sent()

#                             # Print True or False based on data sent to Sparkplug B
#                             print(f"Data Sent to Sparkplug B: {data_sent_to_sparkplug}")

#                             if record.timestamp and record.timestamp < sparkplug_retention_period:
#                                 if data_sent_to_sparkplug:
#                                     session.delete(record)
#                                     session.commit()
#                                     print(f"Record deleted (older than 7 seconds) for device: '{device_name}'")
#                                 else:
#                                     print(f"Data not sent to Sparkplug B. Retaining record for device: '{device_name}'")

#                             elif record.timestamp and record.timestamp < no_sparkplug_retention_period:
#                                 print(f"Retaining record for device: '{device_name}' (No Sparkplug B upload)")

#                         except Exception as e:
#                             print(f"An error occurred processing device: '{device_name}': {e}")

#                 except KeyboardInterrupt:
#                     client.close()
#                     print("Exiting the loop...........")

#     except Exception as e:
#         print(f"An error occurred in the main loop: {e}")


# if __name__ == "__main__":
#     main()


#------------------------------------------------------- 
#   SQLITE  +  SPARKPLUG_B 
#------------------------------------------------------- 
import time
import socket
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
from spb import init_spb_device

def main():
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

            # spb_dev initialized
            for device_dict in config["devices"]:
                init_spb_device(group_name, edge_node_id, device_dict)

            while True:
                time.sleep(3)
                success = True  # Initialize success variable for the entire process

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
                                    setattr(record, parameter_name, data)
                                    spb_device.data.set_value(parameter_name, data)
                                    print(f"updated '{parameter_name}' with value: {data}")
                                else:
                                    print(f"Attribute name is missing in the specification for parameter {parameter}")

                            except Exception as e:
                                success = False
                                print(f"An error occurred reading Modbus data for {parameter}: {e}")

                        session.add(record)
                        session.commit()

                        # Attempt to publish data to Sparkplug B
                        try:
                            spb_device.publish_data()
                            print("True")
                            # pass
                        except Exception as e:
                            success = False
                            print("False")
                            print(f"Failed to publish data to Sparkplug B: {e}")

                        device_name = device_dict["device_name"]
                        print(f"Record committed for device: '{device_name}'\n\n")
                    except Exception as e:
                        success = False
                        print(f"An error occurred: {e}")
                        break

                # Print True or False based on the success of publishing data for all devices
                print(success)

    except KeyboardInterrupt:
        client.close()
        print("Exiting the loop...........")

if __name__ == "__main__":
    main()
