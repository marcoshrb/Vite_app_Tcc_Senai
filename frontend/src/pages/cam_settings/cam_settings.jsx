import Navbar from '../../components/navbar/navbar';
import FlipCardSmall from '../../components/flip_card_small/flip_card_small';
import Camera from '../../components/camera/camera';
import ModalConfig from '../../components/modal_config/modal_config';
import Loading from '../../components/loading/loading';

import Vector from './assets/Vector.svg'
import settings from './assets/settings.svg'


import style from './cam_settings.module.css'

import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function CamSettigns() {


    const [modalConfig, setModalConfig] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleModal = () =>
    {
        setModalConfig(!modalConfig)
    }

    const token = localStorage.getItem('authToken')
    const navigate = useNavigate();

    useEffect(() => {
        if (token) return
        navigate('/')
    }, [token, navigate])
    

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
                        <Camera setLoading={setLoading}/>
                    </div>
                </div>
            </div>
            {modalConfig &&
                <ModalConfig setVariable={handleModal} />
            }
            {loading &&
                <Loading/>
            }
        </div>
    );
}