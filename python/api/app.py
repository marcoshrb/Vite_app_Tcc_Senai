from . import routes

from flask import Flask, Blueprint

app = Flask(__name__)

for item in routes.__all__:
    if isinstance(item, Blueprint):
        app.register_blueprint(item)