from .app import app

def run(port:int):
    app.run(port=port, threaded=True)