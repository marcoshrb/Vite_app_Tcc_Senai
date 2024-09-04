import Logo from './assets/logo_black.svg'
import Icon_person from './assets/icon _person_.svg'
import Right_to_bracket from './assets/right-to-bracket-solid.svg'

import style from './login.module.css'

import FlipCardSmall from '../../components/flip_card_small/flip_card_small'
import { useState } from 'react'

export default function Login() {
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    console.log(user)
    console.log(senha)

    return (
        <div className={style.Login_all}>
            <div className={style.Login_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div>
            <div className={style.Login_div_Right}>
                <h1 className={style.Login_bem_vindo}>Bem Vindo</h1>
                <div>
                    <p className={style.Login_p}>Usuário: </p>
                    <input onChange={(evento) => setUser(evento.target.value)} value={user} className={style.Login_Inputs} type='password' />
                </div>
                <div>
                    <p className={style.Login_p}>Senha: </p>
                    <input onChange={(evento) => setSenha(evento.target.value)} value={senha} className={style.Login_Inputs} type='email' />
                </div>
                <div className={style.Login_Recuperar_senha}>
                    <p className={style.Login_p_Esqueceu}>Esqueceu sua senha?</p>
                    <a className={style.Login_p_Esqueceu} href=''>Recuperar</a>
                </div>
                <div className={style.Login_FlipCards}>
                    <FlipCardSmall Icon={Icon_person} Text_desc={'Cadastre-se'} To={"./cadastro"} />
                    <FlipCardSmall Icon={Right_to_bracket} Text_desc={'Log in'} To={"./home"} />
                </div>
            </div>
        </div>
    )
}