import Navbar from '../../components/navbar/navbar';
import FlipCardSmall from '../../components/flip_card_small/flip_card_small';
import Camera from '../../components/camera/camera';
import ModalConfig from '../../components/modal_config/modal_config';

import Vector from './assets/Vector.svg'
import settings from './assets/settings.svg'


import style from './cam_settings.module.css'

import { useState} from 'react';

export default function CamSettigns() {


    const [modalConfig, setModalConfig] = useState(false)

    const handleModal = () =>
    {
        setModalConfig(!modalConfig)
    }
    

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
                        <Camera/>
                    </div>
                </div>
            </div>
            {modalConfig &&
                <ModalConfig setVariable={handleModal} />
            }
        </div>
    );
}