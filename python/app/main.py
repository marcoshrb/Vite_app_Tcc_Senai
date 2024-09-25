import tracking as tck

from config import Config

from .trackers.hand_tracking import HandTracking
from .system_infos import parallel_updater, system

parallel_updater()
tck.init(system.screens_size, system.webcam, flags=tck.HandTracking)

hand_tck_config = Config('HandTracking')

running = True
while running:
    if hand_tck_config['in_use']:
        HandTracking.run()