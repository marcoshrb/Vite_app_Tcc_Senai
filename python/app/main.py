import tracking as tck

from config import Config

from .events import loading
from .trackers.face_tracking import FaceTracking
from .trackers.hand_tracking import HandTracking
from .system_infos import parallel_updater, System

parallel_updater()
System.wait_to_load()

tck.init(System.screens_size, System.webcam, flags=tck.type.HAND_TRACKING)

face_tck_config = Config('FaceTracking')
hand_tck_config = Config('HandTracking')
loading.set()

running = True
while running:
    if face_tck_config['in_use'] == True:
        FaceTracking.run()
    if hand_tck_config['in_use'] == True:
        HandTracking.run()