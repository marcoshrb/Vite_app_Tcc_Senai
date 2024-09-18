import Cam_icon from './assets/interface-de-camera.svg'
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import style from './camera.module.css'

import Face from './assets/scanner-de-face.svg'
import Hand from './assets/scanner-de-mão.svg'
import Eye from './assets/scanner-de-olho.svg'

export default function Camera({setLoading}) {

    const { tracking } = useParams();

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [iconTracking, setIconTracking] = useState();
    const videoRef = useRef(null);
    const streamRef = useRef(null);


    useEffect(() => {
        switch (tracking) {
            case "eye-tracking":
                setIconTracking(Eye);
                break;
            case "hand-tracking":
                setIconTracking(Hand);
                break;
            case "face-tracking":
                setIconTracking(Face);
                break;
            default:
                setIconTracking(null);
                break;
        }
    }, [tracking]);

    const SetCam = () => {
        const startCamera = async () => {
            try {
                setLoading(true);
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setIsCameraOn(true);
            } catch (error) {
                console.log(error)
                alert('Câmera indisponível...');
            } finally {
                setLoading(false);
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

    const sendCheckboxState = () => {

        const checkbox = document.getElementById('trackingCheckbox');
        const isChecked = checkbox.checked;
        setLoading(true);

        fetch('https://vite-app-tcc-senai-2q6k.vercel.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tracking: tracking,
                status: isChecked
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(setLoading(false))

    }


    return (
        <div className={style.camera_all}>
            <div className={style.camera_switches}>
                <div className={style.switch_all}>
                    {iconTracking && <img src={iconTracking} className={style.Switch_img} alt="Switch icon" />}
                    <label className={style.switch}>
                        <input
                            id="trackingCheckbox"
                            type="checkbox"
                            onChange={() => sendCheckboxState()}
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
