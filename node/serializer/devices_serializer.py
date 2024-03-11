from typing import List, Optional, Set
from pydantic import BaseModel, validator, root_validator
from datetime import timedelta,datetime
import json

from . import AttributeSerializer, ParameterSerializer

class DeviceSerializer(BaseModel):
    device_name: str
    slave_id: int
    attributes: List[AttributeSerializer]
    parameters: Optional[List[ParameterSerializer]] = []
    commands: Optional[list] = ['rebirth', 'INFO', 'ERROR']
    read_protocol: Optional[Set[str]] = set()
    write_protocol: Optional[Set[str]] = set()
    read_handlers: Optional[dict] = {}
    write_handlers: Optional[dict] = {}
    last_read: Optional[datetime] = datetime.now()
    last_write: Optional[datetime] = datetime.now()
    
    def get_redis_key(self, parameter:ParameterSerializer):
        return self.device_name + ":" + parameter.parameter_name

    def redis_json_dump(self):
        data = {
            "parameters": [parameter.redis_data() for parameter in self.parameters],
            "timestamp": datetime.now().timestamp(),
        }
        return json.dumps(data)
    
    @root_validator(pre=True)
    def validate_protocol(cls, values):
        if "set_config" in values:
            values["parameters"] = set_config(values["set_config"])
        return values
    
    @validator('parameters', pre = True, always=True)
    def parameter_validator(cls, v):
        if not v:
            return None
        for param in v:
            print("--",param)
            print("--",param['address'])
            if not param['address']:
                v.remove(param)
            
        return sorted(v, key=lambda x: x['address'])
    
    
def set_config(name):
    model_name = "em_ms_AVH-14-M1"
    if model_name == name:
        parameters = [
            {
            "function_code": "Holding Register",
            "address": 300,
            "parameter_name": "kwh",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            },
            {
            "function_code": "Holding Register",
            "address": 2,
            "parameter_name": "kvah",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            },
            {
            "function_code": "Holding Register",
            "address": 6,
            "parameter_name": "kvarh",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            },
            {
            "function_code": "Holding Register",
            "address": 10,
            "parameter_name": "avg_vln",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            },
            {
            "function_code": "Holding Register",
            "address": 12,
            "parameter_name": "avg_vll",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            },
            {
            "function_code": "Holding Register",
            "address": 44,
            "parameter_name": "avg_current",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            },
            {
            "function_code": "Holding Register",
            "address": 60,
            "parameter_name": "avg_pf",
            "data_type": "Float",
            "threshold": 0.0,
            "aggregation_type": "current_val"
            }
           
        ]
        
        
        return parameters