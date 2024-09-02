import Logo from './assets/Logo eyeTracking White 1.svg'

import style from './navbar.module.css'

export default function Navbar(){
    return(
        <div className={style.navbar}>
            <img src={Logo} className={style.navba_logo}/>
        </div>
    )
}