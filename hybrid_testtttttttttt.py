import time
import datetime
from config import config
from config.db import get_sqlite_session
from modbus_final import read_modbus_data, initialize_modbus_client
from sqlite_final import create_dynamic_models
from spb import init_spb_device, connect_spb_device, init_spb_edge_node, connect_spb_node
import socket
from config.aggrigation import Aggregate

aggregator = Aggregate()

# connect to mqtt broker if the sparkplugb device is not connected 
def connect_to_broker(device_dict, broker, port, user, password):
    if not device_dict["spb_device_connected"]:
        print("Connecting to broker from while loop...")
        connect_spb_device(device_dict, broker, port, user, password)

# retrive data from modbus 
def retrieve_modbus_data(client, slave_id, reg_no, reg_data_type):
    try:
        data = read_modbus_data(client, slave_id, reg_no, reg_data_type)
        return data
    except Exception as e:
        print(f"An error occurred reading Modbus data: {e}")
        return None



#dynamic get from json 
set_qos = config["mqtt"]["qos"]

# publish data to sparkplug b
def publish_to_sparkplug_b(spb_device, qos = set_qos):
   
    try:
        success = spb_device.publish_data()
        print(f"Publish success: {success}")
        return success
    except Exception as e:
        print(f"Failed to publish data to Sparkplug B: {e}")
        return False

# perform data retantion in SQlite database
def perform_data_retention(session, model, retention_period):
    records_to_delete = session.query(model).filter(model.timestamp < retention_period).all()
    for record in records_to_delete:
        session.delete(record)
    session.commit()

# main function
def main():

    # configuration setup
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
        # modbus client setup
        com_port = config["modbus"]["port"]
        devices = config["devices"]
        client = initialize_modbus_client()
        client.connect()

        hostname = socket.gethostname()

        # create dynamic model for sqlite
        create_dynamic_models(devices, hostname)
        session = get_sqlite_session()

        # get spb parameters
        group_name = config.get("spb_parameter").get("group_id")
        edge_node_id = config.get("spb_parameter").get("edge_node_id")
        broker = config.get("mqtt").get("broker_host") 
        port = config.get("mqtt").get("broker_port")
        user = config.get("mqtt").get("user")        
        password = config.get("mqtt").get("password")
        

        success = None
        init_spb_edge_node(group_id = group_name, edge_node_id = edge_node_id, config = config)
        connect_spb_node( config,  broker , port, user, password)
        # config["spb_node"].attribures.get_value_list()
        print('\\n\n\n config["spb_node"].attribures.get_value_list(): ', config["spb_node"].attribures.get_dictionary())
        # initialized and connect spb devices
        for device_dict in config["devices"]:
            init_spb_device(group_name, edge_node_id, device_dict)
            connect_spb_device(device_dict, broker , port, user, password)

        value=[]

        # main loop
        while True:
            time.sleep(time_sleep_minutes * 60 + time_sleep_seconds)

            for device_dict in devices:
                if not device_dict.get("publish_time"):
                    device_dict["publish_time"] = datetime.datetime.now()
                model = device_dict["model"]
                record = model()
                slave_id = device_dict.get("slave_id")
                spb_device = device_dict["spb_device"]

                # connecte to mqtt broker 
                connect_to_broker(device_dict, broker, port, user, password)


                # retrive data from modbus and update records
                for parameter in device_dict["parameters"]:
                    if not parameter.get("value"):
                        parameter["value"] = []
                        
                    print('\n\n\n\ndevice_dict:............ ', device_dict)
                    function_code = parameter.get("function_code")
                    parameter_name = parameter.get("parameter_name")
                    reg_no = parameter.get("address")
                    reg_data_type = parameter.get("data_type")
                    threshold = parameter.get("threshold")
                    aggregation_type = parameter.get("aggregation_type")

                        
                    if parameter_name :
                        data = retrieve_modbus_data( client, slave_id, reg_no, reg_data_type)
                        parameter["value"].append(data)
                        print(f'\n\n\n\n {parameter_name} value: ', parameter["value"])
                    else:
                        data = None

               
                    if data:
                        setattr(record, parameter_name, data)
                        
                        # TODO add min day 
                        publish_delay = datetime.timedelta(
                        days=config["publish_time"]["days"],
                        hours=config["publish_time"]["hours"],
                        minutes=config["publish_time"]["minutes"],
                        seconds=config["publish_time"]["seconds"]
                        )
                        # check publish time delay
                        if device_dict["publish_time"] + publish_delay < datetime.datetime.now():
                        
                            # fatch threshold
                            threshold_value = threshold
                            # print('\n\n\n threshold_value: ', threshold_value)
                            
                            old_data = spb_device.data.get_value(parameter_name)
                            val = aggregator.aggregate_data(type = parameter["aggregation_type"],data = parameter["value"])
                            print("\n\n\n------------------------------------ aggregated value : ",val)
                            if old_data  - threshold_value > val  or val > old_data + threshold_value:
                                    
                                    spb_device.data.set_value(parameter_name, data,int(datetime.datetime.now().timestamp() * 1000))
                                    parameter["value"] = []
                                    # print('spb_device.data.: ', spb_device.data)

                
                        # print(f"Updated '{parameter_name}' with value: {data}")
                else:
                    print(f"Attribute name is missing in the specification for parameter {parameter}")

                #  add and commit to the record to the sqlite database
                session.add(record)
                session.commit()

                # publish data to spb
                success = publish_to_sparkplug_b(spb_device)

                #  set the retantion based on success or failure
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
                    print(f"Records retained for device: '{device_dict['device_name']}'")

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
                        print(f"Records retained for device (failure case): '{device_dict['device_name']}'")

    except KeyboardInterrupt:
        client.close()
        print("Exiting the loop...........")

if __name__ == "__main__":
    main()