import redis
from serializer.devices import ParameterSerializer, DeviceSerializer

# redis_interface.py
class RedisInterface:
    def __init__(self, host, port):
        # Initialize Redis connection
        self.redis = redis.StrictRedis(host=host, port=port, db=0)

    def store_data(self, device:DeviceSerializer,parameter:ParameterSerializer):
        self.redis.rpush(device.device_name,parameter.redis_json())

    def retrieve_data(self,device:DeviceSerializer):
        data = self.redis.lpop(device.device_name)
        if data:
            return data.decode()
        return None