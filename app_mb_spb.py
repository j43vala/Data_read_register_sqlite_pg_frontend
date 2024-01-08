import time
import socket
from config import config
from mqtt_spb_wrapper import MqttSpbEntityDevice
from modbus_final import read_modbus_data, initialize_modbus_client
from spb import init_spb_device

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
            group_name = config.get("spb_parameter").get("group_id")
            edge_node_id = config.get("spb_parameter").get("edge_node_id")


            for device_dict in config["devices"]:
                init_spb_device(group_name, edge_node_id, device_dict)

            while True:
                time.sleep(3)
                for device_dict in devices:
                    try:
                        
                        spb_device = device_dict["spb_device"]
                        
                        slave_id = device_dict.get("slave_id")

                        for parameter in device_dict["parameters"]:
                            try:
                                parameter_name = parameter.get("parameter_name")

                                reg_no = parameter.get("address")
                                reg_data_type = parameter.get("data_type")
                                

                                if parameter_name is not None:
                                    data = read_modbus_data(client,slave_id, reg_no, reg_data_type)
                                    spb_device.data.set_value(parameter_name, data)
                                    
                                    # Update the existing record instead of creating a new one
                                    # setattr(record, parameter_name, data)
                                    print(f"Updated '{parameter_name}' with value: {data}")


                                else:
                                    print(f"Attribute name is missing in the specification for parameter {parameter}")
                            except Exception as e:
                                import traceback
                                traceback.print_exc()
                                print(f"An error occurred processing parameter {parameter}: {e}")
                        
                        spb_device.publish_data()
                        

                        # publish_data(device_dict, record)
                        
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
