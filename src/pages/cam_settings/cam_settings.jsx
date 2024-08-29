import Navbar from '../../components/navbar/navbar';
import FlipCardSmall from '../../components/flip_card_small/flip_card_small';
import Camera from '../../components/camera/camera';
import ModalConfig from '../../components/modal_config/modal_config';

import Vector from './assets/Vector.svg'
import settings from './assets/settings.svg'

import Face from './assets/scanner-de-face.svg'
import Hand from './assets/scanner-de-mão.svg'
import Eye from './assets/scanner-de-olho.svg'

import style from './cam_settings.module.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CamSettigns() {

    const { tracking } = useParams();

    const [modalConfig, setModalConfig] = useState(false)
    const [iconTracking, setIconTracking] = useState()

    const handleModal = () =>
    {
        setModalConfig(!modalConfig)
    }
    
    useEffect(() => {
        switch(tracking) {
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
    }, []);

    return (
        <div className={style.cam_settigns}>
            <Navbar/>
            <div className={style.cam_settigns_body}>
                <div className={style.cam_settigns_flip_cards}>
                    <FlipCardSmall Icon={Vector} Text_desc={'Voltar'} To={'../home'}/>
                    <FlipCardSmall Icon={settings} Text_desc={'Config'} SetVariable={handleModal}/>
                </div>
                <div className={style.cam_settigns_cam_response}>
                    <div className={style.Return_cam}>
                        <Camera img_Tracking={iconTracking}/>
                    </div>
                </div>
            </div>
            {modalConfig &&
                <ModalConfig setVariable={handleModal} />
            }
        </div>
    );
}