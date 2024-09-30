import cv2

from app.events import loading
from tracking import CONFIG
from config import Config

hand_config = Config('HandTracking')

def main():
    loading.wait()

    cap = CONFIG.VIDEO_CAPTURE
    while cap.isOpened:
        frame = cap.frame
        if frame is None:
            continue
        
        if hand_config['in_use'] == True:
            from app.trackers.hand_tracking import HandTracking
            for hand in HandTracking.hands:
                hand.draw(frame, (255, 0, 0))
                
        cv2.imshow("Camera", frame)
        cv2.waitKey(10)