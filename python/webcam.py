import cv2
import numpy as np

from app.events import loading
from tracking import CONFIG
from tracking.utils import normalize_pixel
from config import Config

hand_config = Config('HandTracking')
face_config = Config('FaceTracking')

def main():
    loading.wait()

    cap = CONFIG.VIDEO_CAPTURE
    while cap.isOpened:
        frame = cap.frame
        width, height = cap.shape
        if frame is None:
            continue
        images = []
            
        if face_config['in_use'] == True:
            from app.trackers.face_tracking import FaceTracking
            for face in FaceTracking.faces:
                face.draw(frame, (255, 100, 100))
                face.draw_contour(frame, (255, 0, 0))
                
                center = face.landmarks.get_points([9])[0]
                direction = face.direction()
                point = [point + dir * 0.2 for point, dir in zip(center, direction)]
                cv2.line(frame, normalize_pixel(*center[:2], width, height), normalize_pixel(*point[:2], width, height), (0, 0, 255), 2)                
                
                
        if hand_config['in_use'] == True:
            from app.trackers.hand_tracking import HandTracking
            for hand in HandTracking.hands:
                hand.draw(frame, (255, 0, 0))
                cv2.circle(frame, normalize_pixel(*hand.center_palm()[:2], width, height), 5, (0, 0, 255), -1)
            
            (minx, maxx), (miny, maxy) = hand_config['interaction_area'].values()
            cv2.rectangle(frame, (int(width * minx), int(height * miny)), (int(width * maxx), int(height * maxy)), (0, 255, 0))
                
        cv2.imshow("Camera", frame)
        cv2.waitKey(10)