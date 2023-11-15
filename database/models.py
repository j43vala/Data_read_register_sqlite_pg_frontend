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
    # Add a one-to-many relationship to registers
    registers = relationship('Register', backref='device', lazy=True)

class Register(Base):
    __tablename__ = "register"
    id = Column(Integer, primary_key=True, nullable=False)
    active = Column(Boolean, default=True)
    address = Column(Integer, nullable=False)
    column_name = Column(String)
    type = Column(String)
    device_id = Column(Integer, ForeignKey('device.id'))


def create_dynamic_model(table_name, column_specifications):
    class_name = table_name
    class_attributes = {
        "__tablename__": table_name,
        "id": Column(Integer, primary_key=True, autoincrement=True),
        "timestamp": Column(DateTime, default=datetime.utcnow, nullable=False),
    }

    # Define columns dynamically based on the JSON specification
    for register in column_specifications:
        # for register_address, register_info in device_spec.get("register", {}).items():
            col_name = register.get("column_name")
            col_type = register.get("type")

            if col_name is None:
                raise ValueError("Column name is missing in the specification.")

            if col_type is None:
                raise ValueError(f"Column type is missing for column {col_name} in the specification.")

            if col_type == "Integer":
                col_class = Integer
            elif col_type == "Double":
                col_class = Double
            elif col_type == "Float":
                col_class = Float
            else:
                raise ValueError(f"Unsupported column type '{col_type}' for column {col_name}.")

            class_attributes[col_name] = Column(col_class)

    DynamicModel = type(class_name, (Base,), class_attributes)
    return DynamicModel
