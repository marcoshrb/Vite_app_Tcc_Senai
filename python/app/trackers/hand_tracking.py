import mediapipe as mp
import tracking as tck

from config import Config
from tracking.hand_tracking import Hand, Tracking
from typing import List

class HandTracking:
    __tracker: Tracking = None
    __config: Config = Config('HandTracking')
    hands: List[Hand] = []

    @classmethod
    def run(cls):
        pass

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
            for command in commands:
                command(hands, image, timestamp)

        cls.__tracker = Tracking(max_num_hands=max_num_hands,
                                         running_mode=tck.running_mode.LIVE_STREAM,
                                         min_hand_detection_confidence=min_hand_detection_confidence,
                                         min_hand_presence_confidence=min_hand_presence_confidence,
                                         min_tracking_confidence=min_tracking_confidence,
                                         result_callback=callback)
        return command_names

HandTracking._set_tracker()