from flask import request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from models import Attribute, Device  # Import the Attribute model
from db import db
from flask_jwt_extended import current_user,jwt_required

# Create a new Namespace for Attribute
ns = Namespace('Attributes', description='Attribute related operations')

# Define the fields for the Attribute model
attribute_create_fields = ns.model('Attribute', {
    'attributes': fields.List(fields.Nested(ns.model('Attribute', {
        'name': fields.String(required=True),
        'value': fields.String(required=True),
    })), required=True)
})

attribute_update_fields = ns.model('Attribute', {
    'name': fields.String(required=True),
    'value': fields.String(required=True),
    # 'device_id': fields.Integer(required=True),
})

@ns.route('/')
class AttributeResourceList(Resource):
    @jwt_required()
    def get(self):
        """Retrieve all Attributes."""

        if current_user.role.name not in ["super_admin","admin"]:
            return make_response(jsonify({"message":"you are not authorize"}))
        
        status = 0
        return_fields = ["name", "value", "device_id"]
        attributes = db.session.query(Attribute).all()
        if not attributes:
            output = {}
            output["status"] = 0
            output["message"] = "No Attributes found"
            return make_response(jsonify(output), 404)

        output = []
        for attribute in attributes:
            attribute_data = {}
            for field in return_fields:
                attribute_data[field] = getattr(attribute, field)
            output.append(attribute_data)

        status = 1
        return make_response(jsonify({"status": status, 'attributes': output}), 200)

    # @ns.expect(attribute_fields)
    # def post(self):
    #     """Create a new Attribute."""
    #     status = 0

    #     data = request.get_json()
    #     required_fields = ["name", "value", "device_id"]

    #     for req_field in required_fields:
    #         if req_field not in data:
    #             return make_response(jsonify({"status": status, 'message': f"{req_field} not found while executing Create Attribute API"}), 400)

    #     device_id = data["device_id"]
    #     device = db.session.query(Device).filter_by(id=device_id).first()
    #     if not device:
    #         return make_response(jsonify({"status": status, 'message': f"Device with ID {device_id} not found. Attribute must be associated with a valid device."}), 404)

    #     new_attribute = Attribute(
    #         name=data["name"],
    #         value=data["value"],
    #         device_id=device_id
    #     )

    #     db.session.add(new_attribute)
    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, 'message': 'New Attribute created'}), 201)


@ns.route('/<id>')
class AttributeResource(Resource):
    @jwt_required()
    def get(self, id):
        """Retrieve a specific Attribute."""
        status = 0
        return_fields = ["name", "value", "device_id"]
        attribute = db.session.query(Attribute).filter_by(id=id).first()
        if not attribute:
            return make_response(jsonify({"status": status, 'message': 'No Attribute found while executing API Get Attribute By ID!'}), 404)

        attribute_data = {}
        for field in return_fields:
            attribute_data[field] = getattr(attribute, field)

        status = 1
        return make_response(jsonify({"status": status, "attribute": attribute_data}), 200)

    # @ns_attribute.expect(attribute_fields)
    # def put(self, id):
    #     """Update a specific Attribute."""
    #     status = 0
    #     data = request.get_json()
    #     attribute = db.session.query(Attribute).filter_by(id=id).first()
    #     if not attribute:
    #         return make_response(jsonify({"status": status, 'message': 'No Attribute found while executing Update Attribute API!'}), 404)

    #     # Update Attribute fields
    #     for field, value in data.items():
    #         setattr(attribute, field, value)

    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "Attribute has been updated."}), 200)

    # def delete(self, id):
    #     """Delete a specific Attribute."""
    #     status = 0
    #     attribute = db.session.query(Attribute).filter_by(id=id).first()
    #     if not attribute:
    #         return make_response(jsonify({"status": status, 'message': 'No Attribute found while executing Delete Attribute API!'}), 404)

    #     db.session.delete(attribute)
    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "Attribute has been deleted."}), 200)


class CreateAttribute(Resource):
    @jwt_required()
    @ns.expect(attribute_create_fields)
    def post(self, device_id):
        """Create new attributes connected to a device."""

        if current_user.role.name not in ["super_admin","admin"]:
            return make_response(jsonify({"message":"you are not authorize"}))
        
        status = 0
        data = request.get_json()

        # Check if the device exists in the database
        device = db.session.query(Device).filter_by(id=device_id).first()
        if not device:
            return make_response(jsonify({"status": status, 'message': f"Device with ID {device_id} not found. Attribute must be associated with a valid device."}), 404)

        if not isinstance(data, dict) or 'attributes' not in data:
            return make_response(jsonify({"status": status, 'message': "JSON data should be a dictionary with an 'attributes' key containing a list of attributes"}), 400)

        attributes_data = data['attributes']

        status = 1
        created_attributes = []

        for attribute_data in attributes_data:
            required_fields = ["name", "value"]
            for field in required_fields:
                if field not in attribute_data:
                    return make_response(jsonify({"status": status, 'message': f'Required field "{field}" not found in the attribute data'}), 400)

            new_attribute = Attribute(
                name=attribute_data['name'].strip(),
                value=attribute_data['value'],
                device_id=device.id  # Set the device_id for the new attribute
            )

            db.session.add(new_attribute)
            created_attributes.append(new_attribute)

        db.session.commit()

        return make_response(jsonify({
            "status": status,
            'message': 'New attributes created',
            'created_attributes': [attribute.id for attribute in created_attributes]
        }), 201)


        
class UpdateAttribute(Resource):
    @jwt_required()
    @ns.expect(attribute_update_fields)
    def put(self, device_id, id):
        """Update a specific Attribute."""

        if current_user.role.name not in ["super_admin","admin"]:
            return make_response(jsonify({"message":"you are not authorize"}))
        
        status = 0
        data = request.get_json()
        attribute = db.session.query(Attribute).filter_by(id=id).first()
        if not attribute:
            return make_response(jsonify({"status": status, 'message': 'No Attribute found while executing Update Attribute API!'}), 404)

        # Update Attribute fields
        for field, value in data.items():
            setattr(attribute, field, value)

        db.session.commit()

        status = 1
        return make_response(jsonify({"status": status, "message": "Attribute has been updated."}), 200)


class DeleteAttribute(Resource):
    @jwt_required()
    def delete(self,device_id, id):
        """Delete a specific Attribute."""

        if current_user.role.name not in ["super_admin","admin"]:
            return make_response(jsonify({"message":"you are not authorize"}))
        
        status = 0
        attribute = db.session.query(Attribute).filter_by(device_id=device_id, id=id).first()
        if not attribute:
            return make_response(jsonify({"status": status, 'message': 'No Attribute found while executing Delete Attribute API!'}), 404)

        db.session.delete(attribute)
        db.session.commit()

        status = 1
        return make_response(jsonify({"status": status, "message": "Attribute has been deleted."}), 200)


ns.add_resource(CreateAttribute, '/devices/<string:device_id>/attribute')
ns.add_resource(UpdateAttribute, '/devices/<string:device_id>/attribute/<int:id>')
ns.add_resource(DeleteAttribute, '/devices/<string:device_id>/attribute/<int:id>')
