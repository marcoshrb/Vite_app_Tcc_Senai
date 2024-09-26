from functools import wraps
from threading import Lock, Thread

def command(func, sequential: bool = False):
    lock = Lock()
    @wraps(func)
    def wrapper(*args, **kwargs):
        def run_func():
            with lock:
                func(*args, **kwargs)
        
        if sequential or not lock.locked():
            thread = Thread(target=run_func)
            thread.start()
            return thread
        return None
    wrapper.is_command = True
    return wrapper