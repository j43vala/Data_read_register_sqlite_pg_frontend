from flask_restx import Resource, Namespace, fields
import subprocess


ns = Namespace('Services', description='Services related operations')


@ns.route('/restart-services')
class RestartService(Resource):
    def get(self):
        try:
            # Run 'systemctl daemon-reload' to reload units
            subprocess.run(['sudo', 'systemctl', 'restart', 'app_mb_hybrid.service'], check=True)
            return 'Services restarted successfully'
        except subprocess.CalledProcessError as e:
            return f'Error restarting services: {str(e)}'
        
        
@ns.route('/stop-services')
class StopService(Resource):
    def get(self):
        try:
            subprocess.run(['sudo', 'systemctl', 'stop', 'app_mb_hybrid.service'], check=True)
            return 'Services stopped successfully'
        except subprocess.CalledProcessError as e:
            return f'Error stopping services: {str(e)}'
        