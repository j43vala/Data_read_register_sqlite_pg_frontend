from typing import List, Optional, Set
from pydantic import BaseModel, validator, root_validator
from datetime import timedelta,datetime
import json


class SparkplugBSerializer(BaseModel):
    host: str
    port: int
    group_name: str
    gateway_name: str
    user: Optional[str]
    password: Optional[str]
    
    @root_validator(pre=True)
    def validate_sparkplug_b(cls, values):
        if 'broker_host' in values:
            values['host'] = values['broker_host']
            values.pop('broker_host')
        if 'broker_port' in values:
            values['port'] = values['broker_port']
            values.pop('broker_port')
        if 'group_id' in values:
            values['group_name'] = values['group_id']
            values.pop('group_id')
        if 'edge_node_id' in values:
            values['gateway_name'] = values['edge_node_id']
            values.pop('edge_node_id')
        return values
    