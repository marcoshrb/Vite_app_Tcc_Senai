import mediapipe as mp
import pyautogui
import tracking as tck

from app.command_label import command
from app.system_infos import System
from tracking.hand_tracking import Hand
from tracking.utils import math
from threading import Lock
from typing import List

from ..abstract import AbstractTracking

pyautogui.FAILSAFE = False

x, y = (0, 0)
primary_btn = False
secondary_btn = False
global_lock = Lock()

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

    with global_lock:
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

    thumb  = 0 <= thumb_tip[0]  <= 1 and 0 <= thumb_tip[1]  <= 1
    index  = 0 <= index_tip[0]  <= 1 and 0 <= index_tip[1]  <= 1
    middle = 0 <= middle_tip[0] <= 1 and 0 <= middle_tip[1] <= 1
    
    with global_lock:
        global primary_btn, secondary_btn
        if  (thumb and index and
            math.euclidean_distance(thumb_tip, index_tip) < 0.05):
            if middle and math.euclidean_distance(thumb_tip, middle_tip) < 0.05:
                primary_btn = False
                secondary_btn = True
            else:
                primary_btn = True
                secondary_btn = False
        else:
            primary_btn = False
            secondary_btn = False

prev_primary_btn = False
prev_secondary_btn = False
@command
def _mouse_set_status(cls: AbstractTracking, *args):
    if not cls.hands:
        return
    
    with global_lock:
        global prev_primary_btn, prev_secondary_btn
        global primary_btn, secondary_btn
        global x, y
        
        update_primary_btn = primary_btn != prev_primary_btn
        update_secondary_btn = secondary_btn != prev_secondary_btn
        if not (update_primary_btn or update_secondary_btn):
            pyautogui.moveTo(x, y)
            return
        
        if update_primary_btn:
            if primary_btn:
                pyautogui.mouseDown(x, y, button='primary')
            else:
                pyautogui.mouseUp(x, y, button='primary')
            
        if update_secondary_btn:
            if secondary_btn:
                pyautogui.mouseDown(x, y, button='secondary')
            else:
                pyautogui.mouseUp(x, y, button='secondary')

        prev_primary_btn = primary_btn
        prev_secondary_btn = secondary_btn

__all__ = [_mouse_move, _mouse_click, _mouse_set_status]