import mediapipe as mp
import tracking as tck

from config import Config
from tracking.face_tracking import Face, Tracking
from typing import List

from . import face_commands
from .abstract import AbstractTracking

class FaceTracking(AbstractTracking):
    __tracker: Tracking = None
    config: Config = Config('FaceTracking')
    faces: List[Face] = []
    image: mp.Image = None
    
    @classmethod
    def run(cls):
        cls.__tracker.predict()
        
    @classmethod
    def _set_tracker(cls, 
                     max_num_faces: int = 1,
                     min_face_detection_confidence: float = 0.5,
                     min_face_presence_confidence: float = 0.5,
                     min_tracking_confidence: float = 0.5,
                     output_face_blendshapes: bool = False,
                     output_facial_transformation_matrixes: bool = False):
        commands = [method for method 
                    in [getattr(cls, name) 
                        for name 
                        in dir(cls)] 
                    if hasattr(method, 'is_command')]
        command_names = [method.__name__ for method in commands]
        
        def callback(faces: List[Face], image: mp.Image, timestamp: int):
            cls.faces = faces
            cls.image = image
            for command in commands:
                command(cls, faces, image, timestamp)
                
        cls.__tracker = Tracking(running_mode=tck.running_mode.LIVE_STREAM,
                                 max_num_faces=max_num_faces,
                                 min_face_detection_confidence=min_face_detection_confidence,
                                 min_face_presence_confidence=min_face_presence_confidence,
                                 min_tracking_confidence=min_tracking_confidence,
                                 output_face_blendshapes=output_face_blendshapes,
                                 output_facial_transformation_matrixes=output_facial_transformation_matrixes,
                                 result_callback=callback)
        return command_names
    
for command in face_commands.__all__:
    if hasattr(command, 'is_command'):
        setattr(FaceTracking, command.__name__, command)

FaceTracking._set_tracker()