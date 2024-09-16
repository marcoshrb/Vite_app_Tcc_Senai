from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

@app.route('/json', methods=['POST'])
def receive_json():
    data = request.get_json()

    if data is None:
        return jsonify({'error': 'No JSON data received'}), 400

    tracking = data.get('tracking')

    if tracking == "hand-tracking":
        return jsonify({'hand': True})  # liga o hand tracking

    if tracking == "face-tracking":
        return jsonify({'face': True})  # liga o face tracking

    if tracking == "eye-tracking":
        return jsonify({'eye': True})  # liga o eye tracking

    return jsonify({'error': 'Invalid tracking type'}), 400

if __name__ == '__main__':
    app.run(debug=True)
