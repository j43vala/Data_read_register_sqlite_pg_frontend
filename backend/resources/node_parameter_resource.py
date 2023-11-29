from flask import request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from models import NodeParameter  # Import the NodeParameter model
from db import db
from services.modbus_port import get_serial_ports
from sqlalchemy.orm.attributes import  flag_modified

ns = Namespace('NodeParameters', description='Node Parameter related operations')

node_parameter_fields = ns.model('NodeParameter', {
    'name': fields.String(required=True, description='Node Parameter name'),
    'value': fields.Raw(required=True, description='Node Parameter value (JSON object)'),
})

def create_default_node_parameters():
    port_options = get_serial_ports()
    if type(port_options) == str:
        port_options = [""]        
    # Default values
    default_values = [
        {
            "name": "modbus",
            "value": {
                "port": "",
                "method": "rtu",
                "parity": "N",
                "baudrate": 9600,
                "stopbits": 1,
                "wordlength": 8,
                "port_options": get_serial_ports(),
                "method_options": ["rtu", "ascii"],
                "parity_options": ['ODD', 'EVEN', 'NONE'],
                "baudrate_options": [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000, 256000],
                "stopbits_options": [1, 2],
                "wordlength_options": [7, 8]
            },
        },
        {
            "name": "mqtt",
            "value": {
                "broker_host": "broker.hivemq.com",
                "broker_port": 1883
            }
        },
        {
            "name": "spb_parameter",
            "value": {
                "group_id": "wzero",
                "edge_node_id": "rpi1"
            }
        },
        {
            "name": "node_attributes",
            "value": [
                # {"name": "description", "value": "plc_Simple EoN Device node"},
                # {"name": "version", "value": "0.01"}
            ]
        }
    ]

    # Add default values to the database if they don't already exist
    for item in default_values:
        existing_node_parameter = NodeParameter.query.filter_by(name=item['name']).first()
        
        if not existing_node_parameter:
            node_parameter = NodeParameter(name=item['name'], value=item['value'])
            db.session.add(node_parameter)

    # Commit the changes to the database
    db.session.commit()


@ns.route('/')
class NodeParameterResourceList(Resource):
    def get(self):
        """Retrieve all node parameters."""
        status = 0
        return_fields = ["id","name", "value"]
        node_parameters = db.session.query(NodeParameter).all()
        if not node_parameters:
            output = {}
            output["status"] = 0
            output["message"] = "No Node Parameters found"
            return make_response(jsonify(output), 404)

        node_parameter_list = []
        for node_parameter in node_parameters:
            if node_parameter.name == "modbus":
                port_options = get_serial_ports() 
                if type(port_options) == str:
                    node_parameter.value['port_options'] = [""]
                else:
                    node_parameter.value['port_options'] = port_options
                if node_parameter.value['parity'] == "N":
                    node_parameter.value['parity'] = 'NONE'
                elif node_parameter.value['parity'] == "O":
                    node_parameter.value['parity'] = 'ODD'
                elif node_parameter.value['parity'] == "E":
                    node_parameter.value['parity'] = 'EVEN'
                    
            node_parameter_data = {}
            for field in return_fields:
                node_parameter_data[field] = getattr(node_parameter, field) 

            node_parameter_list.append(node_parameter_data)

        status = 1
        return make_response(jsonify({"status": status, 'node_parameters': node_parameter_list}), 200)

    # @ns.expect(node_parameter_fields)
    # def post(self):
    #     """Create a new node parameter."""
    #     required_fields = ["name", "value"]

    #     status = 0

    #     data = request.get_json()
    #     json_fields = data.keys()

    #     for req_field in required_fields:
    #         if req_field not in json_fields:
    #             return make_response(jsonify({"status": status, 'message': f"{req_field} not found while executing Create Node Parameter API"}), 404)

    #     new_node_parameter = NodeParameter(name=data["name"], value=data["value"])

    #     db.session.add(new_node_parameter)
    #     db.session.commit()

    #     status = 1
    #     return make_response(jsonify({"status": status, 'message': 'New Node Parameter created'}), 201)
    
    @ns.expect(node_parameter_fields)
    def post(self):
        """Create a new node parameter."""
        required_fields = ["name", "value"]
        status = 0

        data = request.get_json()
        json_fields = data.keys()

        for req_field in required_fields:
            if req_field not in json_fields:
                return make_response(jsonify({"status": status, 'message': f"{req_field} not found while executing Create Node Parameter API"}), 404)


        # Retrieve an existing NodeParameter (if needed)
        existing_node_parameter = db.session.query(NodeParameter).filter_by(name="node_attributes").first()

        # If an existing NodeParameter is found, append the new dictionary to its value attribute
        if existing_node_parameter:
            for value in data["value"]:    
                existing_node_parameter.value.append(value)
            flag_modified(existing_node_parameter, "value")
            db.session.add(existing_node_parameter)
            db.session.commit()
        status = 1
        return make_response(jsonify({"status": status, 'message': ' Node Attribute Value added to the list'}), 201)


@ns.route('/<id>')
class NodeParameterResource(Resource):
    def get(self, id):
        """Retrieve a specific node parameter."""
        status = 0
        return_fields = ["name", "value"]
        node_parameter = db.session.query(NodeParameter).filter_by(id=id).first()
        if not node_parameter:
            return make_response(jsonify({"status": status, 'message': 'No node parameter found while executing API Get Node Parameter By ID!'}), 404)

        node_parameter_data = {}
        for field in return_fields:
            node_parameter_data[field] = getattr(node_parameter, field)

        status = 1
        return make_response(jsonify({"status": status, "node_parameter": node_parameter_data}), 200)

    # @ns.expect(node_parameter_fields)
    # def put(self, id):
    #     """Update a specific node parameter."""
    #     status = 0
    #     data = request.get_json()
        
    #     node_parameter = db.session.query(NodeParameter).filter_by(id=id).first()
    #     if not node_parameter:
    #         return make_response(jsonify({"status": status, 'message': 'No node parameter found while executing Update Node Parameter API!'}), 404)
        

    #     json_fields = data.keys()

    #     for field in json_fields:
    #         setattr(node_parameter, field, data[field])
    #         node_parameter.value = data[field]
            
    #         if data['modbus']['parity'] == "ODD":
    #             data['modbus']['parity'] = "O"
    #         elif data['modbus']['parity'] == "EVEN":
    #             data['modbus']['parity'] = "E"
    #         elif data['modbus']['parity'] == "NONE":
    #             data['modbus']['parity'] = "N"    
                    
    #     db.session.add(node_parameter)
    #     db.session.commit()
    #     db.session.close()

    #     status = 1
    #     return make_response(jsonify({"status": status, "message": "Node Parameter has been updated."}), 200)
    
    @ns.expect(node_parameter_fields)
    def put(self, id):
        """Update a specific node parameter."""
        status = 0
        data = request.get_json()

        node_parameter = db.session.query(NodeParameter).filter_by(id=id).first()
        if not node_parameter:
            return make_response(jsonify({"status": status, 'message': 'No node parameter found while executing Update Node Parameter API!'}), 404)

        json_fields = data.keys()

        for field in json_fields:
            if field == 'modbus' and 'parity' in data[field]:
                # Update modbus parity only
                if data[field]['parity'] == "ODD":
                    data[field]['parity'] = "O"
                elif data[field]['parity'] == "EVEN":
                    data[field]['parity'] = "E"
                elif data[field]['parity'] == "NONE":
                    data[field]['parity'] = "N"
                setattr(node_parameter, field, data[field])
                # print(f"\n\n Data parity parameter update: {data[field]}")
            else:
                # Update other fields
                setattr(node_parameter, field, data[field])
                # print(f"\n\n Data other parameter update: {data[field]}")
                
            node_parameter.value = data[field]
                

        db.session.add(node_parameter)
        db.session.commit()
        db.session.close()

        status = 1
        return make_response(jsonify({"status": status, "message": "Node Parameter has been updated."}), 200)


    def delete(self, id):
        """Delete a specific node parameter."""
        status = 0
        return_fields = ["name"]
        node_parameter = db.session.query(NodeParameter).filter_by(id=id).first()

        if not node_parameter:
            return make_response(jsonify({"status": status, 'message': 'No node parameter found while executing API Get Node Parameter By ID!'}), 404)

        # Delete the node parameter
        db.session.delete(node_parameter)

        # Commit the changes
        db.session.commit()

        # Close the session
        db.session.close()

        status = 1
        return make_response(jsonify({"status": status, "message": "Node Parameter has been deleted."}), 200)

