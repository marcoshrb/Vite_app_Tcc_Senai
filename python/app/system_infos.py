import numpy as np

from screeninfo import get_monitors
from threading import Lock, Thread

from config import Config

class System:
    __lock = Lock()
    __system = Config('System')
    
    monitors = []
    screens_size = (0, 0)
    
    @classmethod
    def update(cls):
        cls.__search_monitors()
    
    @classmethod
    def __search_monitors(cls):
        monitors = get_monitors()
        size = np.max([(m.x + m.width, m.y + m.height) for m in monitors], axis=0)
        with cls.__lock:
            cls.monitors = monitors
            cls.screens_size = tuple(size)
            
    @property
    def webcam(self):
        return System.__system['webcam']
    
system = System()

def parallel_updater():
    def update():
        while True:
            System.update()
            
    thread = Thread(target=update)
    thread.start()