from .routes.hand_tracking import hand_tck_bp

from flask import Flask

app = Flask(__name__)

app.register_blueprint(hand_tck_bp)