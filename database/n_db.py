from sqlalchemy import Column, Integer, DateTime, Float, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from config.db import sqlite_engine

Base = declarative_base()

class NData(Base):
    __tablename__ = "n_data"
    id = Column(Integer, primary_key=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    temperature = Column(Float, nullable=False)
    ram_usage = Column(String, nullable=False)
    
Base.metadata.create_all(sqlite_engine)