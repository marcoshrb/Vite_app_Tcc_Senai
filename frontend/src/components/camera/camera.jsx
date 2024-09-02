import Cam_icon from './assets/interface-de-camera.svg'
import { useState, useRef } from 'react';

import style from './camera.module.css'

export default function Camera({ img_Tracking }) {

    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);


    const SetCam = () => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setIsCameraOn(true);
            } catch (error) {
                alert('Não tem camera boboca');
            }
        };

        const stopCamera = () => {
            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();
                tracks.forEach((track) => track.stop());
                streamRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setIsCameraOn(false);
        };

        if (isCameraOn) {
            stopCamera();
        } else {
            startCamera();
        }


    }


    return (
        <div className={style.camera_all}>

            <div className={style.camera_switches}>
                <div className={style.switch_all}>
                    {img_Tracking && <img src={img_Tracking} className={style.Switch_img} alt="Switch icon" />}
                    <label className={style.switch}>
                        <input
                            type="checkbox"
                        />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>

                <div className={style.switch_all}>
                    {Cam_icon && <img src={Cam_icon} className={style.Switch_img} alt="Switch icon" />}
                    <label className={style.switch}>
                        <input
                            type="checkbox"
                            checked={isCameraOn}
                            onChange={() => SetCam()}
                        />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>

            </div>

            <div className={style.camera_video}>
                <video ref={videoRef} autoPlay playsInline width="100%" height="100%" />
            </div>
        </div>
    );
}
