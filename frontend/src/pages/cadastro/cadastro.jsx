import Logo from '../../assets/logo_black.svg';
import style from './cadastro.module.css';

import Loading from '../../components/loading/loading';
import AlertDefault from '../../components/alert_default/alert_default';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';


function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [adm, setAdm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [erroResponse, setErroResponse] = useState(false);
    const [erroNome, setErroNome] = useState(false);
    const [erroEmail, setErroEmail] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);
    const [erroSenhas, setErroSenhas] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setErroResponse(false);
            setErroNome(false);
            setErroEmail(false);
            setErroSenha(false);
            setErroSenhas(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };

    }, [erroResponse, erroNome, erroEmail, erroSenha, erroSenhas]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formValid()) return;

        const user = { nome, email, senha, adm };
        setLoading(true);

        try {
            const response = await api.post("/user", user);
            if (response.status === 201) {
                navigate('../');
            }
        } catch (error) {
            console.log(error)
            setErroResponse(true);
        } finally {
            setLoading(false);
        }
    }

    function formValid() {
        if (nome.length < 1) {
            setErroNome(true)
            return false;
        }
        if (email.length < 7) {
            setErroEmail(true)
            return false;
        }
        if (senha.length < 3) {
            setErroSenha(true)
            return false;
        }
        if (confSenha !== senha) {
            setErroSenhas(true)
            return false;
        }
        if (nome === "adm" && senha === "adm123") {
            setAdm(true);
        }

        return true;
    }


    return (
        <div className={style.cadastro_all}>
            {erroResponse &&
                <AlertDefault titulo={'Erro de conexão!'} mensagem={''} />
            }
            {erroNome &&
                <AlertDefault titulo={'Campo incorreto'} mensagem={'Insira o nome'} />
            }
            {erroEmail &&
                <AlertDefault titulo={'Campo incorreto'} mensagem={'Insira um e-mail válido'} />
            }
            {erroSenha &&
                <AlertDefault titulo={'Campo incorreto'} mensagem={'Senha inferior a 3 caracteres'} />
            }
            {erroSenhas &&
                <AlertDefault titulo={'Campo incorreto'} mensagem={'As senhas não conferem'} />
            }

            <div className={style.cadastro_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div>
            <form onSubmit={handleSubmit} className={style.cadastro_div_Right}>
                <h1 className={style.cadastro_bem_vindo}>Cadastro</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', width: '75%' }}>
                    <div style={{width: '100%'}}>
                        <input
                            onChange={(evento) => setNome(evento.target.value)}
                            value={nome}
                            className={style.cadastro_Inputs}
                            type='text'
                            placeholder='Username'
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <input
                            onChange={(evento) => setEmail(evento.target.value)}
                            value={email}
                            className={style.cadastro_Inputs}
                            type='email'
                            placeholder='Email'
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <input
                            onChange={(evento) => setSenha(evento.target.value)}
                            value={senha}
                            className={style.cadastro_Inputs}
                            type='password'
                            placeholder='Password'
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <input
                            onChange={(evento) => setConfSenha(evento.target.value)}
                            value={confSenha}
                            className={style.cadastro_Inputs}
                            type='password'
                            placeholder='Confirm Password'
                        />
                    </div>
                    <div className={style.cadastro_voltar_login}>
                        <p className={style.cadastro_text_voltar}>Já possui conta?</p>
                        <a className={style.cadastro_text_voltar} href='../'>Log-in</a>
                    </div>
                </div>
                <button className={style.cadastro_button_continuar} type='submit'>
                    Continuar
                </button>
            </form>
            {loading &&
                <Loading />
            }
        </div>
    );
}

export default Cadastro;
