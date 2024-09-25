from functools import wraps
from threading import Thread

def command(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        def run_func():
            func(*args, **kwargs)
        
        thread = Thread(target=run_func)
        thread.start()
        return thread
    wrapper.is_command = True
    return wrapper