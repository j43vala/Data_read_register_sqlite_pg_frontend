import redis
from serializer import ParameterSerializer, DeviceSerializer
import json
# redis_interface.py
class RedisInterface:
    def __init__(self, host, port):
        # Initialize Redis connection
        self.redis = redis.StrictRedis(host=host, port=port, db=0)

    def store_data(self, key, payload):
        self.redis.rpush(key, payload)

    def retrieve_dataset(self,key):
        data = []
        while True:
            temp = self.redis.lpop(key)
            if temp:
                data.append(json.loads(temp.decode()))
            else:
                return data