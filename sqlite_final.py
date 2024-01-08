import time
from config.db import sqlite_engine
from config.data_conversion import read_integer, read_double, read_float
from database.models import create_dynamic_model , check_and_add_column
# Function to create dynamic models and tables
# def create_dynamic_models(devices, hostname):

#     for device in devices:
#         device_name = device.get("device_name", "")
#         slave_id = device.get("slave_id", "")
#         table_name = f"{hostname}_{slave_id}_{device_name}"
#         parameter_list = device.get("parameters")

#         model = create_dynamic_model(table_name, parameter_list)
#         model.__table__.create(sqlite_engine, checkfirst=True)
#         for parameter in parameter_list:
#             column_name = parameter["parameter_name"]
#             column_type = parameter["data_type"]
#             check_and_add_column(sqlite_engine, table_name,column_name, column_type )
#         device["model"] = model
#     return device
def create_dynamic_models(devices, hostname):
    device = {}
    for device in devices:
        device_name = device.get("device_name", "")
        slave_id = device.get("slave_id", "")

        # Sanitize the table name
        table_name = f"{hostname}_{slave_id}_{device_name}".replace('-', '_').replace(' ', '_')

        parameter_list = device.get("parameters")

        model = create_dynamic_model(table_name, parameter_list)
        model.__table__.create(sqlite_engine, checkfirst=True)
        for parameter in parameter_list:
            column_name = parameter["parameter_name"]
            column_type = parameter["data_type"]
            check_and_add_column(sqlite_engine, table_name, column_name, column_type)
        device["model"] = model

    return device
