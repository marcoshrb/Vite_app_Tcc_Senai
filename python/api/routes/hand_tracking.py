from flask import Blueprint, jsonify, request

from app.events import loading
from config import Config

hand_tck_bp = Blueprint('hand_tracking', __name__)

config = Config('HandTracking')

@hand_tck_bp.route('/hand_tracking/status', methods=['POST'])
def set_status():
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No JSON data received'}), 400

    status = data.get('status')
    if isinstance(status, bool):
        config['in_use'] = status
        return jsonify({ 'message': 'Status updated successfully', 'status': status }), 200
    
    return jsonify({ 'error': 'Status must be a boolean' }), 400

@hand_tck_bp.route('/loaded', methods=['GET'])
def is_loaded():
    return jsonify({ 'loaded': loading.is_set() })

__all__ = [hand_tck_bp]