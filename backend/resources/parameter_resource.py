from flask import request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from models import Parameter, Device  # Import the parameter model
from db import db

# Create a new Namespace for parameter
ns = Namespace('Parameters', description='Parameter related operations')

# Define the fields for the parameter model
parameter_create_fields = ns.model('ParameterCreate', {
    'parameters': fields.List(fields.Nested(ns.model('Parameter', {
        'active': fields.Boolean(required=True),
        'function_code': fields.String(required=True),
        'address': fields.String(required=True),
        'parameter_name': fields.String(required=True),
        'data_type': fields.String(required=True),
        'threshold': fields.Float(required=True)
    })))
})


parameter_update_fields = ns.model('ParameterUpdate', {
    'active': fields.Boolean(description='Parameter active status'),
    'function_code': fields.String(required=True),    
    'address': fields.String(description='Parameter address', required=True),
    'parameter_name': fields.String(description='Parameter name'),
    'data_type': fields.String(description='Parameter data_type'),
    'threshold': fields.Float(required=True)
    
})

@ns.route('/')
class ParameterResourceList(Resource):
    def get(self):
        """Retrieve all Parameters."""
        status = 0
        return_fields = [ "function_code" ,"address", "parameter_name","data_type","threshold", "device_id"]
        parameters = db.session.query(Parameter).all()
        if not parameters:
            output = {}
            output["status"] = 0
            output["message"] = "No Parameters found"
            return make_response(jsonify(output), 404)

        output = []
        for parameter in parameters:
            parameter_data = {}
            for field in return_fields:
                parameter_data[field] = getattr(parameter, field)
            output.append(parameter_data)

        status = 1
        return make_response(jsonify({"status": status, 'parameters': output}), 200)

    # @ns.expect(parameter_fields)
    # def post(self):
    #     """Create a new parameter."""
    #     required_fields = ["address","parameter_name","data_type", "device_id"]

    #     status = 0

    #     data = request.get_json()
    #     json_fields = data.keys()

    #     for req_field in required_fields:
    #         if req_field not in json_fields:
    #             return make_response(jsonify({"status": status, 'message': f"{req_field} not found while executing Create parameter API"}), 404)

    #     device_id = data["device_id"]
    #     device = db.session.query(Device).filter_by(id=device_id).first()
    #     if not device:
    #         return make_response(jsonify({"status": status, 'message': f"Device with ID {device_id} not found. parameter must be associated with a valid device."}), 404)

    #     new_parameter = parameter(
    #         address=data["address"],
    #         parameter_name=data.get("parameter_name"),
    #         data_type=data.get("data_type"),
    #         device_id=device_id
    #     )

    #     db.session.add(new_parameter)
    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, 'message': 'New parameter created'}), 201)
    
    # @ns.expect(parameter_create_fields)
    # def post(self):
    #     """Create new parameters."""
    #     status = 0
    #     data = request.get_json()

    #     if not isinstance(data, dict):
    #         return make_response(jsonify({"status": status, 'message': "JSON data should be a dictionary with multiple parameters"}), 400)

    #     if "address" not in data or "parameter_name" not in data or "data_type" not in data or "device_id" not in data:
    #         return make_response(jsonify({"status": status, 'message': 'Required fields not found in the JSON data'}), 400)

    #     addresses = data["address"].split(',')
    #     column_names = data["parameter_name"].split(',')
    #     types = data["data_type"].split(',')
    #     # device_id = data["device_id"]

    #     if len(addresses) != len(column_names) or len(addresses) != len(types):
    #         return make_response(jsonify({"status": status, 'message': 'Mismatched number of elements in address, parameter_name, and data_type'}), 400)

    #     # # Check if the device exists in the database
    #     # device = db.session.query(Device).filter_by(id=device_id).first()
    #     # if not device:
    #     #     return make_response(jsonify({"status": status, 'message': f"Device with ID {device_id} not found. parameter must be associated with a valid device."}), 404)

    #     status = 1
    #     created_parameters = []

    #     for address, parameter_name, parameter_type in zip(addresses, column_names, types):
    #         new_parameter = parameter(
    #             address=address.strip(),
    #             parameter_name=parameter_name.strip(),
    #             data_type=parameter_type.strip(),
    #             # device_id=device_id
    #         )

    #         db.session.add(new_parameter)
    #         created_parameters.append(new_parameter)

    #     db.session.commit()

    #     return make_response(jsonify({"status": status, 'message': 'New parameters created', 'created_parameters': [parameter.id for parameter in created_parameters]}), 201)


@ns.route('/<id>')
class ParameterResource(Resource):
    def get(self, id):
        """Retrieve a specific parameter."""
        status = 0
        return_fields = ["function_code", "address", "parameter_name", "data_type", "threshold"]
        parameter = db.session.query(Parameter).filter_by(id=id).first()
        if not parameter:
            return make_response(jsonify({"status": status, 'message': 'No parameter found while executing API Get parameter By ID!'}), 404)

        parameter_data = {}
        for field in return_fields:
            parameter_data[field] = getattr(parameter, field)

        status = 1
        return make_response(jsonify({"status": status, "parameter": parameter_data}), 200)

    # @ns.expect(parameter_fields)
    # def put(self, id):
    #     """Update a specific parameter."""
    #     status = 0
    #     data = request.get_json()
    #     parameter = db.session.query(parameter).filter_by(id=id).first()
    #     if not parameter:
    #         return make_response(jsonify({"status": status, 'message': 'No parameter found while executing Update parameter API!'}), 404)

    #     json_fields = data.keys()

    #     for parameter_name in json_fields:
    #         setattr(parameter, parameter_name, data[parameter_name])

    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "parameter has been updated."}), 200)
    # @ns.expect(parameter_update_fields)
    # def put(self, id):
    #     """Update a specific parameter connected to a device."""
    #     status = 0
    #     data = request.get_json()

    #     # Find the parameter
    #     parameter = db.session.query(parameter).filter_by(id=id).first()
    #     if not parameter:
    #         return make_response(jsonify({"status": status, 'message': 'No parameter found while executing Update parameter API!'}), 404)

    #     # Check if the parameter is connected to the provided device_id
    #     if parameter.device_id != data.get('device_id'):
    #         return make_response(jsonify({"status": status, 'message': 'parameter is not connected to the provided device_id!'}), 400)

    #     json_fields = data.keys()

    #     for parameter_name in json_fields:
    #         setattr(parameter, parameter_name, data[parameter_name])

    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "parameter has been updated."}), 200)



    # def delete(self, id):
    #     """Delete a specific parameter."""
    #     status = 0
    #     parameter = db.session.query(parameter).filter_by(id=id).first()
    #     if not parameter:
    #         return make_response(jsonify({"status": status, 'message': 'No parameter found while executing Delete parameter API!'}), 404)

    #     db.session.delete(parameter)
    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "parameter has been deleted."}), 200)
    

class CreateParameter(Resource):
    @ns.expect(parameter_create_fields)
    def post(self, device_id):
        """Create new parameters connected to a device."""
        status = 0
        data = request.get_json()

        # Check if the device exists in the database
        device = db.session.query(Device).filter_by(id=device_id).first()
        if not device:
            return make_response(jsonify({"status": status, 'message': f"Device with ID {device_id} not found. Parameter must be associated with a valid device."}), 404)
        
        if not isinstance(data, dict) or 'parameters' not in data:
            return make_response(jsonify({"status": status, 'message': "JSON data should be a dictionary with a 'parameters' key containing a list of parameters"}), 400)

        parameters_data = data['parameters']

        status = 1
        created_parameters = []

        for parameter_data in parameters_data:
            required_fields = ["function_code", "address", "parameter_name", "data_type", "threshold"]
            for field in required_fields:
                if field not in parameter_data:
                    return make_response(jsonify({"status": status, 'message': f'Required field "{field}" not found in the parameter data'}), 400)

            # Check if 'threshold' is provided in parameter_data, otherwise set it to the default value 0.0
            threshold_value = parameter_data.get('threshold', 0.0)
            
            new_parameter = Parameter(
                function_code=parameter_data['function_code'].strip(),
                address=parameter_data['address'].strip(),
                parameter_name=parameter_data['parameter_name'].strip(),
                data_type=parameter_data['data_type'].strip(),
                threshold=threshold_value,
                active=parameter_data['active'],
                device_id=device.id  # Set the device_id for the new parameter
            )

            db.session.add(new_parameter)
            created_parameters.append(new_parameter)

        db.session.commit()

        return make_response(jsonify({
            "status": status,
            'message': 'New parameters created',
            'created_parameters': [parameter.id for parameter in created_parameters]
        }), 201)

        
        
class UpdateParameter(Resource):
    @ns.expect(parameter_update_fields)
    def put(self, device_id, id):
        """Update a specific parameter connected to a device."""
        status = 0
        data = request.get_json()

        # Find the parameter
        parameter = db.session.query(Parameter).filter_by(id=id).first()
        if not parameter:
            return make_response(jsonify({"status": status, 'message': 'No parameter found while executing Update Parameter API!'}), 404)

        # Update parameter fields
        for field, value in data.items():
            setattr(parameter, field, value)

        db.session.commit()

        status = 1
        return make_response(jsonify({"status": status, "message": "parameter has been updated."}), 200)


class DeleteParameter(Resource):
    def delete(self, device_id, id):
        """Delete a specific parameter."""
        status = 0
        parameter = db.session.query(Parameter).filter_by(device_id=device_id, id=id).first()

        if not parameter:
            return make_response(jsonify({"status": status, 'message': 'No parameter found while executing Delete Parameter API!'}), 404)

        db.session.delete(parameter)
        db.session.commit()

        status = 1
        return make_response(jsonify({"status": status, "message": "Parameter has been deleted."}), 200)

    
ns.add_resource(CreateParameter, '/devices/<string:device_id>/parameter')
ns.add_resource(UpdateParameter, '/devices/<string:device_id>/parameter/<int:id>')
ns.add_resource(DeleteParameter, '/devices/<string:device_id>/parameter/<int:id>')
