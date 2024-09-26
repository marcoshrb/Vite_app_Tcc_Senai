import mediapipe as mp
import pyautogui
import tracking as tck

from app.command_label import command
from app.system_infos import System
from tracking.hand_tracking import Hand
from typing import List

from ..abstract import AbstractTracking

pyautogui.FAILSAFE = False

x, y = (0, 0)

@command
def _mouse_move(cls: AbstractTracking, hands: List[Hand], image: mp.Image, timestamp: int):
    if not hands:
        return
    
    mouse_hand = next((hand for hand in hands if hand.side == tck.side.RIGHT), hands[0])
    
    width, height = tck.CONFIG.SCREEN_SHAPE
    position = mouse_hand.center_palm()

    if System.mirrored_webcam:
        position = (1 - position[0],) + position[1:]

    (minx, maxx), (miny, maxy) = cls.config['interaction_area'].values()
    normx = (position[0] - minx) / (maxx - minx)
    normy = (position[1] - miny) / (maxy - miny)
    posx, posy = System.screens_pos

    global x, y
    x = posx + normx * width
    y = posy + normy * height

@command
def _mouse_set_status(cls: AbstractTracking, *args):
    if not cls.hands:
        return
    
    pyautogui.moveTo(x, y)

__all__ = [_mouse_move, _mouse_set_status]