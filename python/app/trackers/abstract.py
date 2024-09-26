import mediapipe as mp

from abc import ABC, abstractmethod
from config import Config

class AbstractTracking(ABC):
    config: Config = None
    image: mp.Image = None

    @classmethod
    @abstractmethod
    def run(cls):
        pass

    @classmethod
    @abstractmethod
    def _set_tracker(cls, *args, **kwargs):
        pass