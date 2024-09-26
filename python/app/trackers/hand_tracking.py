import mediapipe as mp
import tracking as tck

from app.system_infos import System
from config import Config
from tracking.hand_tracking import Hand, Tracking
from typing import List

from . import hand_commands
from . abstract import AbstractTracking

class HandTracking(AbstractTracking):
    __tracker: Tracking = None
    config: Config = Config('HandTracking')
    hands: List[Hand] = []
    image: mp.Image = None

    @classmethod
    def run(cls):
        cls.__tracker.predict(side_mirror=System.mirrored_webcam)

    @classmethod
    def _set_tracker(cls,
                     max_num_hands: int = 2,
                     min_hand_detection_confidence: float = 0.5,
                     min_hand_presence_confidence: float = 0.5,
                     min_tracking_confidence: float = 0.5,):
        commands = [method for method 
                    in [getattr(cls, name) 
                        for name 
                        in dir(cls)] 
                    if hasattr(method, 'is_command')]
        command_names = [method.__name__ for method in commands]
        
        def callback(hands: List[Hand], image: mp.Image, timestamp: int):
            cls.hands = hands
            cls.image = image
            for command in commands:
                command(cls, hands, image, timestamp)

        cls.__tracker = Tracking(max_num_hands=max_num_hands,
                                 running_mode=tck.running_mode.LIVE_STREAM,
                                 min_hand_detection_confidence=min_hand_detection_confidence,
                                 min_hand_presence_confidence=min_hand_presence_confidence,
                                 min_tracking_confidence=min_tracking_confidence,
                                 result_callback=callback)
        return command_names
    
for command in hand_commands.__all__:
    if hasattr(command, 'is_command'):
        setattr(HandTracking, command.__name__, command)

HandTracking._set_tracker()