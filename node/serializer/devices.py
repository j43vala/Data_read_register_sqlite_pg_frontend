from typing import List, Optional
from pydantic import BaseModel, validator
from datetime import timedelta,datetime
import json

class AttributeSerializer(BaseModel):
    name: str
    value: str

class ParameterSerializer(BaseModel):
    function_code: str
    address: Optional[int]
    parameter_name: str
    data_type: str
    threshold: Optional[float] = 0
    value: Optional[float] = 0
    last_updated: datetime = datetime.now()
    aggregation_type: Optional[str]
    
    @validator('address', pre=True, always=True)
    def validate_address(cls, v):
        # Return None if validation fails
        if not v:
            return None
        return v
    
    def redis_json(self):
        data = {
            "address": self.address,
            "parameter_name": self.parameter_name,
            "data_type": self.data_type,
            "value": self.value,
            "last_updated": self.last_updated.isoformat()
        }
        return json.dumps(data)
    # @validator('address')
    # def check_value_length(cls, v):
    #     # Custom validation logic
    #     if v and len(v) < 3:
    #         raise ValueError('value must be at least 3 characters long')
    #     return v


class DeviceSerializer(BaseModel):
    device_name: str
    slave_id: int
    attributes: List[AttributeSerializer]
    parameters: List[ParameterSerializer]

class NodeSerializer(BaseModel):
    devices: List[DeviceSerializer]
    mqtt: Optional[dict]
    node_attributes: Optional[List[AttributeSerializer]]
    publish_time: timedelta
    #  'publish_time': {'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 1},
    @validator('publish_time', pre=True)
    def validate_publish_interval(cls, v):
        
        # Return None if validation fails
        if not v:
            return None
        td = timedelta(
                       days=v.get('days',0),
                       hours=v.get('hours',0),
                       minutes=v.get('minutes',0),
                       seconds=v.get('seconds',0))

        return td

if __name__ == '__main__':
    # Example usage of Pydantic models
    data_dict = {
        "devices": [
            {
                "device_name": "plc",
                "slave_id": 1,
                "attributes": [
                    {"name": "Device Name", "value": "plc"},
                    {"name": "Slave ID", "value": "1"},
                    {"name": "Type", "value": "plc"},
                    {"name": "Company", "value": "wecon"},
                    {"name": "Model Number", "value": "lx2e"}
                ],
                "parameters": [
                    {"function_code": "Holding Register", "address": 300, "parameter_name": "kwh", "data_type": "Float", "threshold": 0.0, "aggregation_type": "current_val"},
                    # Add more parameters here
                ]
            }
        ]
    }

    # Deserialize data using Pydantic model
    devices_data = NodeSerializer.model_validate(data_dict)
    print(devices_data)
    print(data_dict)