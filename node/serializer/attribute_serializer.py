from typing import List, Optional, Set
from pydantic import BaseModel, validator
from datetime import timedelta,datetime
import json

class AttributeSerializer(BaseModel):
    name: str
    value: str
