from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def receive_get():
    return jsonify({'get': 'hand-tracking, face-tracking, eye-tracking'})

@app.route('/', methods=['POST'])
def receive_json():
    data = request.get_json()

    if data is None:
        return jsonify({'error': 'No JSON data received'}), 400

    tracking = data.get('tracking')
    status = data.get('status')

    if tracking == "hand-tracking":
        if status:
            return jsonify({'hand': True})  # liga o hand tracking
        else:
            return jsonify({'hand': False})

    if tracking == "face-tracking":
        if status:
            return jsonify({'face': True})  # liga o face tracking
        else:
            return jsonify({'face': False})
    
    if tracking == "eye-tracking":
        if status:
            return jsonify({'eye': True})  # liga o eye tracking
        else:
            return jsonify({'eye': False})
    
    return jsonify({'error': 'Invalid tracking type'}), 400

if __name__ == '__main__':
    app.run(debug=True)
