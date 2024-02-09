from flask import jsonify, make_response
from flask_restx import Resource, Namespace, reqparse
import os
import re
from datetime import datetime

ns = Namespace('Logs', description='Info and Error Logs related operations')


log_parser = reqparse.RequestParser()
log_parser.add_argument('log_type', type=str, help='Type of log (e.g., "info" or "error")', required=True)
log_parser.add_argument('num_occurrences', type=int, default=0, help='Number of occurrences to retrieve')


@ns.route('/logs')
class LogsResource(Resource):
    @ns.expect(log_parser)
    def get(self):
        args = log_parser.parse_args()

        log_type = args['log_type'].lower()
        if log_type not in ['info', 'error']:
            return {'message': 'Invalid log type. Use "info" or "error".'}, 400

        logs = handle_log_command(f'{log_type}.log', args['num_occurrences'])

        return make_response(jsonify({'logs':logs}), 200)

def handle_log_command(log_file_name, num_occurrences):
    script_path = os.path.abspath(__file__)
    dir_path = os.path.dirname(script_path)
    main_path = os.path.dirname(dir_path)
    project_path = os.path.dirname(main_path)
    log_file_path = os.path.join(project_path, log_file_name)
    try:
        with open(log_file_path, 'r') as f:
            lines = f.readlines()

            logs_with_timestamp = []
            current_log = ""
            for line in lines:
                if re.match(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3} - (INFO|ERROR) -', line):
                    if current_log:
                        logs_with_timestamp.append(current_log)
                    current_log = line
                else:
                    current_log += line

            # Append the last log entry
            if current_log:
                logs_with_timestamp.append(current_log)

            # Sort logs based on timestamp
            logs_with_timestamp.sort(key=lambda x: datetime.strptime(re.search(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}', x).group(), "%Y-%m-%d %H:%M:%S,%f"))

            # Return the last N logs
            if num_occurrences > 0:
                logs_with_timestamp = logs_with_timestamp[-num_occurrences:]

            return logs_with_timestamp
    except Exception as e:
        return f"Error handling {log_file_name} command: {e}"