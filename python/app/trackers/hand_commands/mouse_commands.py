import mediapipe as mp
import pyautogui
import tracking as tck

from app.command_label import command
from app.system_infos import System
from tracking.hand_tracking import Hand
from tracking.utils import math
from typing import List

from ..abstract import AbstractTracking

pyautogui.FAILSAFE = False

x, y = (0, 0)
primary_btn = False
secondary_btn = False

previous_primary_btn = False
previous_secondary_btn = False

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
def _mouse_click(cls: AbstractTracking, hands: List[Hand], image: mp.Image, timestamp: int):
    if not hands:
        return
    
    mouse_hand = next((hand for hand in hands if hand.side == tck.side.RIGHT), hands[0])

    thumb_tip_idx = tck.finger.get_tip(tck.finger.THUMB)
    index_tip_idx = tck.finger.get_tip(tck.finger.INDEX)
    middle_tip_idx = tck.finger.get_tip(tck.finger.MIDDLE)

    thumb_tip, index_tip, middle_tip = mouse_hand.landmarks.get_points([thumb_tip_idx, index_tip_idx, middle_tip_idx])

    global primary_btn, secondary_btn
    if 0 <= thumb_tip[0] <= 1 and 0 <= thumb_tip[1] <= 1:
        primary_btn = (0 <= index_tip[0] <= 1 and 
                       0 <= index_tip[1] <= 1 and 
                       math.euclidean_distance(thumb_tip, index_tip) < 0.07)
        
        secondary_btn = (0 <= middle_tip[0] <= 1 and 
                       0 <= middle_tip[1] <= 1 and 
                       math.euclidean_distance(thumb_tip, middle_tip) < 0.07)
    else:
        primary_btn = False
        secondary_btn = False

@command
def _mouse_set_status(cls: AbstractTracking, *args):
    if not cls.hands:
        return
    global previous_primary_btn, previous_secondary_btn
    
    if primary_btn == previous_primary_btn and secondary_btn == previous_secondary_btn:
        pyautogui.moveTo(x, y)
        return
    
    if primary_btn and not previous_primary_btn:
        pyautogui.mouseDown(x, y)
    elif not primary_btn and previous_primary_btn:
        pyautogui.mouseUp(x, y)

    if secondary_btn and not previous_secondary_btn:
        pyautogui.mouseDown(x, y, button='right')
    elif not secondary_btn and previous_secondary_btn:
        pyautogui.mouseUp(x, y, button='right')

    previous_primary_btn = primary_btn
    previous_secondary_btn = secondary_btn

__all__ = [_mouse_move, _mouse_click, _mouse_set_status]