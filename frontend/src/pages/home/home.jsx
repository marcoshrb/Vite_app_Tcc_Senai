import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import LogoBlack from '../../assets/logo_black.svg'
import IconPerson from './assets/icon _person_.svg';
import IconExit from './assets/exit.svg';
import IconSettings from './assets/settings.svg';

import Trackings from '../../components/trackings/trackings'
import Sidebar from '../../components/sidebar/sidebar'
import FlipCardSmall from '../../components/flip_card_small/flip_card_small';
import style from './home.module.css'

export default function Home() {
    const [Options_open, setOptions_open] = useState(false)
    
    const handleOptions = () => {
        setOptions_open(!Options_open)
    }

    const exit_button = () => {
        localStorage.clear()
    }
    
    const token = localStorage.getItem('authToken')
    const navigate = useNavigate();

    useEffect(() => {
        if (token) return

        navigate('/')
    }, [token, navigate])
    

    return (
        <div className={style.HomePage}>
            <img src={LogoBlack} alt='Logo' className={style.Logo_Home} />
            <Trackings />
            <div className={style.nav__Options}>
                <div>
                    <div className={style.wrap_flip_card_small}>
                        <FlipCardSmall Icon={IconExit} Text_desc={'Sair'} To={"../"} SetVariable={() => exit_button()} />
                    </div>
                </div>
                <div>
                    <div className={style.wrap_flip_card_small}>
                        <FlipCardSmall Icon={IconPerson} Text_desc={'Conta'} To={""}/>
                    </div>
                </div>
                <div>
                    <div className={style.wrap_flip_card_small}>
                        {!Options_open &&
                            <FlipCardSmall Icon={IconSettings} Text_desc={'Config'} To={""} SetVariable={() => handleOptions()} />
                        }
                    </div>
                </div>
            </div>
            {Options_open &&
                <Sidebar SetVariable={() => handleOptions()} />
            }
            {Options_open && <div className={style.Overlay} />}
        </div>
    )
}