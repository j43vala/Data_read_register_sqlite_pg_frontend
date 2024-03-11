from flask_restx import Api, Namespace
# from flask import json, current_app

sample_tess = Namespace('tess', description='Sample related operations')


authorizations = {
        "Bearer": {"type": "apiKey",
        "in": "header",
        "name": "Authorization"}
    }

api = Api(
    title='RESTX APIs for development',
    version='2.0',
    description='API list and requests for integration purpose',
    doc='/test/',
    authorizations=authorizations,
    security='Bearer'
)

from .device_resource import ns as device_ns
from .parameter_resource import ns as parameter_ns
from .node_parameter_resource import ns as node_parameter_ns
from .device_attribute_resource import ns as attribute_ns
from .services_resource import ns as service_ns
from .logs_resource import ns as log_ns
from .user_resource import ns as user_ns
from .auth_resources import ns as auth_ns
from .confirmation_resources import ns as confirm_ns

api.add_namespace(device_ns, path='/devices')
api.add_namespace(parameter_ns, path='/parameter')
api.add_namespace(node_parameter_ns, path='/node-parameter')
api.add_namespace(attribute_ns, path='/attribute')
api.add_namespace(service_ns, path='/service')
api.add_namespace(log_ns, path='/logs')
api.add_namespace(user_ns,path='/user')
api.add_namespace(auth_ns,path="")
api.add_namespace(confirm_ns,path="")