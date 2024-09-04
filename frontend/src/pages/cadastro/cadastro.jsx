import Logo from './assets/logo_black.svg'
import style from './cadastro.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';


function Cadastro() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [adm, setAdm] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
    
        if (!formValid()) return;
    
        const user = { nome, cpf, senha, adm };
    
        console.log(user, "eueueueueueueue")
        api.post("/user",  user )
            .then((res) => {
                console.log('hhhhhhhhhhhhhhhhh');
                if (res.data.status === 201) {
                    const newUserId = res.data.userId;
                    setUserId(newUserId);

                    navigate('../');
                }
            })
            .catch(error => {
                console.log(error);
                console.log('aaaaaaaaaaaaaaaaaaa');

            });
    }

    // async function handleSubmit(e) {

    //     e.preventDefault();

    //     if (!formValid())
    //         return

    //     const json = {
    //         nome, cpf, senha, adm
    //     }

    //     try {
    //         var res = await api.post("user",
    //             { json }
    //         )

    //         if (res.status === 201) {
    //             const newUserId = res.data.userId;
    //             setUserId(newUserId);
    //             navigate('../');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    function formValid() {

        if (nome.length < 1) {
            console.log('Insira o nome')
            return false;
        }
        if (cpf.length < 11) {
            console.log('Insira um e-mail válido')
            return false;
        }
        if (confSenha !== senha) {
            console.log('As senhas não conferem')
            return false;
        }
        if (senha.length < 3) {
            console.log('Senha inferior a 3 caracteres')
            return false
        };
        if (nome === "adm" && senha === "adm123") {
            setAdm(true)
        };

        return true
    }

    return (
        <div className={style.cadastro_all}>
            <div className={style.cadastro_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div>
            <div className={style.cadastro_div_Right}>
                <h1 className={style.cadastro_bem_vindo}>Cadastro</h1>
                <div>
                    <p className={style.cadastro_p}>Nome: </p>
                    <input onChange={(evento) => setNome(evento.target.value)} value={nome} className={style.cadastro_Inputs} />
                </div>
                <div>
                    <p className={style.cadastro_p}>CPF: </p>
                    <input onChange={(evento) => setCPF(evento.target.value)} value={cpf} className={style.cadastro_Inputs} />
                </div>
                <div>
                    <p className={style.cadastro_p}>Senha: </p>
                    <input onChange={(evento) => setSenha(evento.target.value)} value={senha} className={style.cadastro_Inputs} />
                </div>
                <div>
                    <p className={style.cadastro_p}>Confirmar senha: </p>
                    <input onChange={(evento) => setConfSenha(evento.target.value)} value={confSenha} className={style.cadastro_Inputs} />
                </div>
                <div className={style.cadastro_voltar_login}>
                    <p className={style.cadastro_text_voltar}>Já possui conta?</p>
                    <a className={style.cadastro_text_voltar} href='../'>Log-in</a>
                </div>
                <button className={style.cadastro_button_continuar} onClick={handleSubmit}>
                    Continuar
                </button>
            </div>
        </div>
    )
}

export default Cadastro;