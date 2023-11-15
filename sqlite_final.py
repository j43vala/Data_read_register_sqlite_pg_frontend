import time
from config.db import sqlite_engine
from config.data_conversion import read_integer, read_double, read_float
from database.models import create_dynamic_model

# Function to create dynamic models and tables
def create_dynamic_models(devices, hostname):
    models = {}

    for device in devices:
        device_name = device.get("device_name", "")
        slave_id = device.get("slave_id", "")
        table_name = f"{hostname}_{slave_id}_{device_name}"
        register_list = device.get("registers")

        model = create_dynamic_model(table_name, register_list)
        model.__table__.create(sqlite_engine, checkfirst=True)

        device["model"] = model
