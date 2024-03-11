from typing import List, Optional, Set
from pydantic import BaseModel, validator, root_validator
from datetime import timedelta,datetime
import platform
import psutil
import os

from . import AttributeSerializer, DeviceSerializer, ParameterSerializer, ModbusRTUSerializer, SparkplugBSerializer

class RetentionSerializer(BaseModel):
    check_frequency: Optional[timedelta] = timedelta(minutes=1)
    failure_retention: Optional[timedelta] = timedelta(days=15)
    success_retention: Optional[timedelta] = timedelta(days=7)
    
    @validator('check_frequency', pre=True)
    def validate_check_frequency(cls, v):
        return timedelta(**v)
    @validator('failure_retention', pre=True)
    def validate_failure_retention(cls, v):
        return timedelta(**v)
    @validator('success_retention', pre=True)
    def validate_success_retention(cls, v):
        return timedelta(**v)

class NodeParameterSerializer(BaseModel):
    parameter_name: str
    value: float
    
    def update_value(self):
        if self.parameter_name == "ram":
            self.value = psutil.virtual_memory().percent
        elif self.parameter_name == "cpu":
            self.value = psutil.cpu_percent()
        elif self.parameter_name == "disk":
            self.value = psutil.disk_usage(os.path.abspath(os.sep)).percent
        print(self.parameter_name, self.value)

class NodeSerializer(BaseModel):
    system: str = platform.system()
    attributes: Optional[List[AttributeSerializer]]
    parameters: Optional[List[NodeParameterSerializer]]
    devices: List[DeviceSerializer]
    
    # read communication protocol parameters
    modbus: Optional[ModbusRTUSerializer] =None
    
    # middleware parameters
    redis: Optional[dict] = None
    
    # write communication protocol parameters
    mqtt: Optional[dict] = None
    spb_parameters: Optional[SparkplugBSerializer] = None
    sqlalchemy: Optional[dict] = None
    
    # time related parameters
    retention_parameters: Optional[RetentionSerializer] = None
    
    write_frequency: Optional[timedelta] = timedelta(seconds=6)
    read_frequency: timedelta = timedelta(seconds=2)
    
    node_read_write_frequency: Optional[timedelta] = timedelta(seconds=10)
    last_read: Optional[datetime] = datetime.now()
    last_write: Optional[datetime] = datetime.now()
    
    def get_devices_for_read_protocol(self, protocol:str):
        # print(self.devices)
        return [device for device in self.devices if protocol in device.read_protocol]
    
    def get_devices_for_write_protocol(self, protocol:str):
        return [device for device in self.devices if protocol in device.write_protocol]
    
    def set_write_handlers(self, protocol:str, handler:dict):
        for device in self.devices:
            if protocol in device.write_protocol:
                device.write_handlers = handler

    @validator('write_frequency', pre=True)
    def validate_write_frequency(cls, v):
        # Return None if validation fails
        if not v:
            return None
        return timedelta(**v)
    
    @validator('read_frequency',pre =True)
    def validate_read_frequency(cls, v):
        if not v:
            return None
        return timedelta(**v)
    
    @root_validator(pre=True)
    def validate_modbus(cls, values):
        if 'spb_parameter' in values:
            if not values.get('mqtt'):
                raise ValueError("modbus parameters are required")
            else:
                spb_parameter = values.get('spb_parameter')
                mqtt = values.get('mqtt')
                spb_parameter.update(mqtt)
                values['spb_parameters'] = spb_parameter
                values.pop('spb_parameter')
                
        if "publish_time" in values:
            values["publish_frequency"] = values["publish_time"]
            values.pop("publish_time")
            
        if 'retention_parameter' in values:
            values['retention_parameters'] = values['retention_parameter']
            values.pop('retention_parameter')
        
        if 'node_attributes' in values:
            values['attributes'] = values['node_attributes']
            values.pop('node_attributes')
        
        parameters = [{
          "parameter_name": "ram",
          "value": 0
        },{
          "parameter_name": "cpu",
          "value": 0
        },{
          "parameter_name": "disc",
          "value": 0
        }]
        values['parameters'] = parameters
        return values
