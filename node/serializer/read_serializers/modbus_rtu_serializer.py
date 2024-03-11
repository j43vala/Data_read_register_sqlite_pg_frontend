from typing import List, Optional, Set
from pydantic import BaseModel, validator
from datetime import timedelta,datetime
import json


import time
import struct
from random import randint
from datetime import datetime
from pymodbus.client import ModbusSerialClient


class ModbusRTUSerializer(BaseModel):
    port: str
    baudrate: int = 9600
    parity: str = 'N'
    bytesize: int = 8
    stopbits: int = 1
    timeout: float = 3
    write_timeout: int = 3

    @validator('baudrate')
    def validate_baudrate(cls, v):
        if v not in [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]:
            raise ValueError("Invalid baudrate. Must be one of: 110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200")
        return v
    
    @validator('parity')
    def validate_parity(cls, v):
        if v not in ['N', 'E', 'O']:
            raise ValueError("Invalid parity. Must be one of: 'N', 'E', 'O'")
        return v

    @validator('bytesize')
    def validate_bytesize(cls, v):
        if v not in [7, 8]:
            raise ValueError("Invalid byte size. Must be one of: 7, 8")
        return v

    @validator('stopbits')
    def validate_stopbits(cls, v):
        if v not in [1, 1.5, 2]:
            raise ValueError("Invalid stop bits. Must be one of: 1, 1.5, 2")
        return v


if __name__ == '__main__':
    # Example usage:
    config_data = {
        "port": "/dev/ttyUSB0",
        "baudrate": 9600,
        "parity": "N",
        "bytesize": 8,
        "stopbits": 1
    }

    modbus_config = ModbusRTUSerializer(**config_data)
    modbus_client = modbus_config.create_client()

    # Now you can use the Modbus client for reading/writing to Modbus devices
