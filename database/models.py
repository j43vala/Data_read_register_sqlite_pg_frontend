from typing import List, Optional
from sqlalchemy import Column, ForeignKey, Float, Integer, DateTime, String, Boolean, Double
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Device(Base):
    __tablename__ = "device"

    id = Column(Integer, primary_key=True, nullable=False)
    active = Column(Boolean, default=True)
    name = Column(String, unique=True)
    slave_id = Column(Integer)
    # Add a one-to-many relationship to parameters
    parameters = relationship('parameter', backref='device', lazy=True)

class parameter(Base):
    __tablename__ = "parameter"
    id = Column(Integer, primary_key=True, nullable=False)
    active = Column(Boolean, default=True)
    address = Column(Integer, nullable=False)
    parameter_name = Column(String)
    data_type = Column(String)
    device_id = Column(Integer, ForeignKey('device.id'))


def create_dynamic_model(table_name, column_specifications):
    class_name = table_name
    class_attributes = {
        "__tablename__": table_name,
        "id": Column(Integer, primary_key=True, autoincrement=True),
        "timestamp": Column(DateTime, default=datetime.utcnow, nullable=False),
    }

    # Define columns dynamically based on the JSON specification
    for parameter in column_specifications:
        # for parameter_address, parameter_info in device_spec.get("parameter", {}).items():
            col_name = parameter.get("parameter_name")
            col_data_type = parameter.get("data_type")

            if col_name is None:
                raise ValueError("Column name is missing in the specification.")

            if col_data_type is None:
                raise ValueError(f"Column data_type is missing for column {col_name} in the specification.")

            if col_data_type == "Integer":
                col_class = Integer
            elif col_data_type == "Double":
                col_class = Double
            elif col_data_type == "Float":
                col_class = Float
            elif col_data_type == "Boolean":
                col_class = Boolean
            else:
                raise ValueError(f"Unsupported column data_type '{col_data_type}' for column {col_name}.")

            class_attributes[col_name] = Column(col_class)

    DynamicModel = type(class_name, (Base,), class_attributes)
    return DynamicModel
