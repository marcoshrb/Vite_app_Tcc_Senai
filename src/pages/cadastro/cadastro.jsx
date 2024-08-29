import Logo from './assets/logo_black.svg'
import Icon_person from './assets/icon _person_.svg'
import Right_to_bracket from './assets/right-to-bracket-solid.svg'

import style from './cadastro.module.css'

import FlipCardSmall from '../../components/flip_card_small/flip_card_small'

function Cadastro() {

    return (
        <div className={style.Login_all}>
            <div className={style.Login_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div>
            <div className={style.Login_div_Right}>
                <h1 className={style.Login_bem_vindo}>Bem Vindo</h1>
                <p className={style.Login_p}>Usuário: </p>
                <input className={style.Login_Inputs} />
                <p className={style.Login_p}>Senha: </p>
                <input className={style.Login_Inputs} />
                <div className={style.Login_Recuperar_senha}>
                    <p className={style.Login_p_Esqueceu}>Esqueceu sua senha?</p>
                    <a className={style.Login_p_Esqueceu} href=''>Recuperar</a>
                </div>
                <div className={style.Login_FlipCards}> 
                    <FlipCardSmall Icon={Icon_person} Text_desc={'Log-in'} To={'../'} />
                    <FlipCardSmall Icon={Right_to_bracket} Text_desc={'Continuar'} />
                </div>
            </div>
        </div>
    )
}

export default Cadastro;