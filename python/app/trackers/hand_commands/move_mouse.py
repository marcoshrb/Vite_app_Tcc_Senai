import mediapipe as mp
import pyautogui
import tracking as tck

from tracking.hand_tracking import Hand
from typing import List

from app.command_label import command

pyautogui.FAILSAFE = False

@command
def _move_mouse(hands: List[Hand], image: mp.Image, timestamp: int):
    if not hands:
        return
    
    mouse_hand = next((hand for hand in hands if hand.side == tck.side.RIGHT), hands[0])
    
    width, height = tck.CONFIG.SCREEN_SHAPE
    position = mouse_hand.center_palm()

    pyautogui.moveTo((1 - position[0]) * width, position[1] * height)

__all__ = [_move_mouse]