import mediapipe as mp
import pyautogui
import tracking as tck

from app.command_label import command
from tracking.hand_tracking import Hand
from typing import List

from ..abstract import AbstractTracking

in_use = False
hand_command = [False, True, True, True, False]
queue = [False] * 10

@command
def _change_window(cls: AbstractTracking, hands: List[Hand], image: mp.Image, timestamp: int):
    if not hands:
        return
    global in_use, hand_command, queue
    
    dominant_hand = next((hand for hand in hands if hand.side == tck.side.RIGHT), hands[0])
    
    raised = []
    for finger in tck.finger:
        raised.append(dominant_hand.finger_is_raised(finger))
        
    queue = queue[1:] + [raised == hand_command]
    if set(queue) == {True} and not in_use:
        pyautogui.hotkey('alt', 'ctrl', 'tab')
        in_use = True
    else:
        in_use = False

__all__ = [_change_window]