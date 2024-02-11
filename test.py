# from sqlalchemy import create_engine, Column, Integer, Float, DateTime
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from datetime import datetime, timedelta
# import random

# Base = declarative_base()

# class WZero3PLC(Base):
#     __tablename__ = 'wzero_3_plc'

#     id = Column(Integer, primary_key=True)
#     kwh = Column(Float)
#     kvah = Column(Float)
#     kvarh = Column(Float)
#     avg_vln = Column(Float)
#     avg_vll = Column(Float)
#     avg_current = Column(Float)
#     avg_pf = Column(Float)
#     frequency = Column(Float)
#     total_kw = Column(Float)
#     total_kva = Column(Float)
#     total_kvar = Column(Float)
#     timestamp = Column(DateTime)

# class WZero3PLC2(Base):
#     __tablename__ = 'wzero_3_plc_2'

#     id = Column(Integer, primary_key=True)
#     kwh = Column(Float)
#     kvah = Column(Float)
#     kvarh = Column(Float)
#     avg_vln = Column(Float)
#     avg_vll = Column(Float)
#     avg_current = Column(Float)
#     avg_pf = Column(Float)
#     frequency = Column(Float)
#     total_kw = Column(Float)
#     total_kva = Column(Float)
#     total_kvar = Column(Float)
#     timestamp = Column(DateTime)

# # Database connection
# database_path = '/home/wzero/Public/Data_read_register_sqlite_pg_frontend/config/local.db'
# engine = create_engine(f'sqlite:///{database_path}')
# Base.metadata.create_all(engine)

# # Generate and insert random data
# Session = sessionmaker(bind=engine)
# session = Session()

# for _ in range(1000):
#     timestamp = datetime.now() - timedelta(days=random.randint(1, 30))
#     data = {
#         'kwh': random.uniform(0, 100),
#         'kvah': random.uniform(0, 100),
#         'kvarh': random.uniform(0, 100),
#         'avg_vln': random.uniform(200, 240),
#         'avg_vll': random.uniform(380, 420),
#         'avg_current': random.uniform(0, 10),
#         'avg_pf': random.uniform(0.8, 1),
#         'frequency': random.uniform(48, 52),
#         'total_kw': random.uniform(0, 100),
#         'total_kva': random.uniform(0, 100),
#         'total_kvar': random.uniform(0, 100),
#         'timestamp': timestamp
#     }

#     # Insert into wzero_3_plc
#     wzero_3_plc_data = WZero3PLC(**data)
#     session.add(wzero_3_plc_data)

#     # Insert into wzero_3_plc_2
#     wzero_3_plc_2_data = WZero3PLC2(**data)
#     session.add(wzero_3_plc_2_data)

# # Commit the changes
# session.commit()