import time
from config.db import sqlite_engine
from config.data_conversion import read_integer, read_double, read_float
from database.models import create_dynamic_model , check_and_add_column
import os
from logger_services import error_logger, info_logger


def create_dynamic_models(devices, hostname):
    device = {}
    for device in devices:
        device_name = device.get("device_name", "")
        slave_id = device.get("slave_id", "")

        if not device_name or not slave_id:
            # Log error if device_name or slave_id is missing
            error_logger.error(f"Missing device_name or slave_id for device: {device}")
            continue

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

        # Log success info
    info_logger.info("Dynamic models created successfully.")

    return device
