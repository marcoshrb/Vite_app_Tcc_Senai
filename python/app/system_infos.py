import numpy as np

from screeninfo import get_monitors, Monitor
from threading import Event, Lock, Thread
from typing import List, Tuple

from config import Config

class System:
    __lock = Lock()
    __system = Config('System')
    __loaded = Event()
    
    monitors:           List[Monitor]   = []
    screens_size:       Tuple[int, int] = (0, 0)
    screens_pos:        Tuple[int, int] = (0, 0)
    webcam:             int             = 0
    mirrored_webcam:    bool            = False

    @classmethod
    def wait_to_load(cls):
        cls.__loaded.wait()
    
    @classmethod
    def update(cls):
        cls.__import_from_config()
        cls.__search_monitors()
        cls.__loaded.set()
    
    @classmethod
    def __search_monitors(cls):
        monitors = get_monitors()
        pos = np.min([(m.x, m.y) for m in monitors], axis=0)
        size = np.max([(m.x - pos[0] + m.width, m.y - pos[1] + m.height) for m in monitors], axis=0)
        with cls.__lock:
            cls.monitors = monitors
            cls.screens_size = tuple(size.tolist())
            cls.screens_pos = tuple(pos.tolist())
            
    @classmethod
    def __import_from_config(cls):
        cls.webcam = cls.__system['webcam']
        cls.mirrored_webcam = cls.__system['mirrored_webcam']

def parallel_updater():
    def update():
        while True:
            System.update()
            
    thread = Thread(target=update)
    thread.start()