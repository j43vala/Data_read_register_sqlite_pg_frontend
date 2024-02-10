from flask import request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from models import Device, Parameter, Attribute  # Import the Device and Parameter models
from db import db

ns = Namespace('Devices', description='Device related operations')

device_fields = ns.model('Device', {
    'name': fields.String(required=True, description='Device name'),
    'active': fields.Boolean(description='Device active status'),
    'slave_id': fields.Integer(description='Device slave ID'),
})

@ns.route('/')
class DeviceResourceList(Resource):
    def get(self):
        """Retrieve all devices with their connected Parameters and Attributes."""
        status = 0
        return_fields = ["id", "name", "slave_id"]
        devices = db.session.query(Device).all()
        if not devices:
            output = {}
            output["status"] = 0
            output["message"] = "No Devices found"
            return make_response(jsonify(output), 404)

        device_list = []
        for device in devices:
            device_data = {}
            for field in return_fields:
                device_data[field] = getattr(device, field)

            # Get connected parameters for the device
            connected_parameters = []
            for parameter in device.parameters:
                parameter_data = {
                    "function_code" : parameter.function_code,                    
                    "address": parameter.address,
                    "parameter_name": parameter.parameter_name,
                    "data_type": parameter.data_type,
                    "threshold" :parameter.threshold,
                    "aggregation_type" :parameter.aggregation_type
                }
                connected_parameters.append(parameter_data)

            device_data["parameters"] = connected_parameters

            # Get connected attributes for the device
            connected_attributes = []
            for attribute in device.attributes:
                attribute_data = {
                    "name": attribute.name,
                    "value": attribute.value,
                }
                connected_attributes.append(attribute_data)

            device_data["attributes"] = connected_attributes
            device_list.append(device_data)

        status = 1
        return make_response(jsonify({"status": status, 'devices': device_list}), 200)


    @ns.expect(device_fields)
    def post(self):
        """Create a new device."""
        required_fields = ["name","slave_id"]

        status = 0

        data = request.get_json()
        json_fields = data.keys()

        for req_field in required_fields:
            if req_field not in json_fields:
                return make_response(jsonify({"status": status, 'message': f"{req_field} not found while executing Create Device API"}), 404)

        device = db.session.query(Device).filter_by(name=data["name"]).first()
        if device:
            return make_response(jsonify({"status": status, 'message': f"Device with the same name already exists, try another name to create a device."}), 409)

        new_device = Device(name=data["name"])

        all_columns = [field.key for field in Device.__table__.columns]

        for parameter_name in all_columns:
            if parameter_name in json_fields:
                setattr(new_device, parameter_name, data[parameter_name])

        db.session.add(new_device)
        db.session.commit()

        status = 1
        return make_response(jsonify({"status": status, 'message': 'New Device created', "device_id": new_device.id }), 201)

@ns.route('/<id>')
class DeviceResource(Resource):
    def get(self, id):
        """Retrieve a specific device with its connected parameters and attributes."""
        status = 0
        return_fields = ["name", "slave_id"]
        device = db.session.query(Device).filter_by(id=id).first()
        if not device:
            return make_response(jsonify({"status": status, 'message': 'No device found while executing API Get Device By ID!'}), 404)

        device_data = {}
        for field in return_fields:
            device_data[field] = getattr(device, field)

        # Get connected parameters for the device
        connected_parameters = []
        for parameter in device.parameters:
            parameter_data = {
                "id" : parameter.id,
                "function_code" : parameter.function_code,
                "address": parameter.address,
                "parameter_name": parameter.parameter_name,
                "data_type": parameter.data_type,
                "threshold" :parameter.threshold,
                "aggregation_type" :parameter.aggregation_type                                
            }
            connected_parameters.append(parameter_data)

        device_data["parameters"] = connected_parameters

        # Get connected attributes for the device
        connected_attributes = []
        for attribute in device.attributes:
            attribute_data = {
                "id": attribute.id,
                "name": attribute.name,
                "value": attribute.value,
            }
            connected_attributes.append(attribute_data)

        device_data["attributes"] = connected_attributes

        status = 1
        return make_response(jsonify({"status": status, "device": device_data}), 200)


    # @ns.expect(device_fields)
    # def put(self, id):
    #     """Update a specific device."""
    #     status = 0
    #     data = request.get_json()
    #     device = db.session.query(Device).filter_by(id=id).first()
    #     if not device:
    #         return make_response(jsonify({"status": status, 'message': 'No device found while executing Update Device API!'}), 404)

    #     json_fields = data.keys()
    #     all_columns = [field.key for field in Device.__table__.columns]

    #     for parameter_name in all_columns:
    #         if parameter_name in json_fields:
    #             setattr(device, parameter_name, data[parameter_name])

    #     db.session.commit()
    #     db.session.close()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "Device has been updated."}), 200)
    
    @ns.expect(device_fields)
    def put(self, id):
        """Update a specific device."""
        status = 0
        data = request.get_json()
        device = db.session.query(Device).filter_by(id=id).first()

        if not device:
            return make_response(jsonify({"status": status, 'message': 'No device found while executing Update Device API!'}), 404)

        json_fields = data.keys()
        all_columns = [field.key for field in Device.__table__.columns]

        # Check if 'name' and 'slave_id' are in the request data
        if 'name' in json_fields and 'slave_id' in json_fields:
            # Find the attribute connected to the device based on 'Device Name' and 'Slave ID'
            connected_attributes = db.session.query(Attribute).filter_by(device_id=device.id).filter(
                (Attribute.name == 'Device Name' and Attribute.value == data['name']) |
                (Attribute.name == 'Slave ID' and Attribute.value == data['slave_id'])
            ).all()

            # Update the values of the connected attributes
            for connected_attribute in connected_attributes:
                if connected_attribute.name == 'Device Name':
                    connected_attribute.value = data['name']
                elif connected_attribute.name == 'Slave ID':
                    connected_attribute.value = data['slave_id']

        for parameter_name in all_columns:
            if parameter_name in json_fields:
                setattr(device, parameter_name, data[parameter_name])

        db.session.commit()
        db.session.close()

        status = 1
        return make_response(jsonify({"status": status, "message": "Device has been updated."}), 200)

    def delete(self, id):
        """Delete a specific device and deactivate associated parameters and attributes."""
        status = 0
        return_fields = ["name"]
        device = db.session.query(Device).filter_by(id=id).first()

        if not device:
            return make_response(jsonify({"status": status, 'message': 'No device found while executing API Get Device By ID!'}), 404)

        # Delete associated parameters
        parameters = db.session.query(Parameter).filter_by(device_id=id).all()
        for parameter in parameters:
            db.session.delete(parameter)

        # Delete associated attributes
        attributes = db.session.query(Attribute).filter_by(device_id=id).all()
        for attribute in attributes:
            db.session.delete(attribute)

        # Delete the device
        db.session.delete(device)

        # Commit the changes
        db.session.commit()

        # Close the session
        db.session.close()

        status = 1
        return make_response(jsonify({"status": status, "message": "Device and associated parameters and attributes have been deactivated."}), 200)


