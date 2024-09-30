import cv2

from app.events import loading
from tracking import CONFIG
from tracking.utils import normalize_pixel
from config import Config

hand_config = Config('HandTracking')

def main():
    loading.wait()

    cap = CONFIG.VIDEO_CAPTURE
    while cap.isOpened:
        frame = cap.frame
        width, height = cap.shape
        if frame is None:
            continue
        
        if hand_config['in_use'] == True:
            from app.trackers.hand_tracking import HandTracking
            for hand in HandTracking.hands:
                hand.draw(frame, (255, 0, 0))
                cv2.circle(frame, normalize_pixel(*hand.center_palm()[:2], width, height), 5, (0, 0, 255), -1)
            
            (minx, maxx), (miny, maxy) = hand_config['interaction_area'].values()
            cv2.rectangle(frame, (int(width * minx), int(height * miny)), (int(width * maxx), int(height * maxy)), (0, 255, 0))
                
        cv2.imshow("Camera", frame)
        cv2.waitKey(10)