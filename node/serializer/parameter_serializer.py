from typing import List, Optional, Set
from pydantic import BaseModel, validator
from datetime import timedelta,datetime
import json


class ParameterSerializer(BaseModel):
    function_code: str
    address: Optional[int]
    parameter_name: str
    data_type: str
    threshold: Optional[float] = 0
    value: Optional[float] = 0
    last_updated: datetime = datetime.now()
    aggregation_type: Optional[str]
    updated: Optional[bool] = False
    
    @validator('address', pre=True, always=True)
    def validate_address(cls, v):
        # Return None if validation fails
        if not v:
            return None
        return v
    
    def redis_data(self):
        self.model_dump()
        if self.updated:
            data = {
                "parameter_name": self.parameter_name,
                "value": self.value,
                # "timestamp": self.last_updated.timestamp()
            }
            self.updated = False
            return data
        return None
    # @validator('address')
    # def check_value_length(cls, v):
    #     # Custom validation logic
    #     if v and len(v) < 3:
    #         raise ValueError('value must be at least 3 characters long')
    #     return v
