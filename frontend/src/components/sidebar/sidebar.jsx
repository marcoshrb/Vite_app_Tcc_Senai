import Logo from './assets/Logo eyeTracking White 1.svg';
import LanguageIcon from './assets/Language.svg';
import WebcamIcon from './assets/Webcam.svg';
import MicIcon from './assets/Mic.svg';
import KeyboardIcon from './assets/Keyboard.svg';
import Back from './assets/Back.svg'

import style from './sidebar.module.css';

import FlipCardSmallNavbar from '../flip_card_small_white/flip_card_small_white';
import FlipCardSmall from '../flip_card_small/flip_card_small'

export default function Sidebar({ SetVariable }) {
    return (
        <div className={style.all_sidebar}>
            <button className={style.button_close_sidebar}>
                <FlipCardSmall Icon={Back} Text_desc={'Fechar'} SetVariable={SetVariable} />
            </button>
            <aside>
                <img src={Logo} alt='Logo EyeTracking' />
                <div>
                    <ul className={style.lista_sidebar}>
                        <li>
                            <FlipCardSmallNavbar Icon={LanguageIcon} Text_desc={'LanguageIcon'} To={'../languages'} />
                        </li>
                        <li>
                            <FlipCardSmallNavbar Icon={WebcamIcon} Text_desc={'WebcamIcon'} />
                        </li>
                        <li>
                            <FlipCardSmallNavbar Icon={MicIcon} Text_desc={'MicIcon'} />
                        </li>
                        <li>
                            <FlipCardSmallNavbar Icon={KeyboardIcon} Text_desc={'KeyboardIcon'} />
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}