import tracking as tck

from config import Config

from .events import loading
from .trackers.hand_tracking import HandTracking
from .system_infos import parallel_updater, System

parallel_updater()
System.wait_to_load()

tck.init(System.screens_size, System.webcam, flags=tck.type.HAND_TRACKING)

hand_tck_config = Config('HandTracking')
loading.set()

running = True
while running:
    if hand_tck_config['in_use']:
        HandTracking.run()