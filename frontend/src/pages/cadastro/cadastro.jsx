import Logo from './assets/logo_black.svg';
import style from './cadastro.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [adm, setAdm] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formValid()) return;

        const user = { nome, email, senha, adm };

        try {
            const response = await api.post("/user", user);
            if (response.status === 201) {
                navigate('../');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Falha ao cadastrar. Verifique os dados e tente novamente.');
        }
    }

    function formValid() {
        if (nome.length < 1) {
            alert('Insira o nome');
            return false;
        }
        if (email.length < 7) {
            alert('Insira um e-mail válido');
            return false;
        }
        if (confSenha !== senha) {
            alert('As senhas não conferem');
            return false;
        }
        if (senha.length < 3) {
            alert('Senha inferior a 3 caracteres');
            return false;
        }
        if (nome === "adm" && senha === "adm123") {
            setAdm(true);
        }

        return true;
    }

  
    return (
        <div className={style.cadastro_all}>
            <div className={style.cadastro_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div>
            <form onSubmit={handleSubmit} className={style.cadastro_div_Right}>
                <h1 className={style.cadastro_bem_vindo}>Cadastro</h1>
                <div>
                    <p className={style.cadastro_p}>Nome: </p>
                    <input
                        onChange={(evento) => setNome(evento.target.value)}
                        value={nome}
                        className={style.cadastro_Inputs}
                        type='text'
                    />
                </div>
                <div>
                    <p className={style.cadastro_p}>Email: </p>
                    <input
                        onChange={(evento) => setEmail(evento.target.value)}
                        value={email}
                        className={style.cadastro_Inputs}
                        type='email'
                    />
                </div>
                <div>
                    <p className={style.cadastro_p}>Senha: </p>
                    <input
                        onChange={(evento) => setSenha(evento.target.value)}
                        value={senha}
                        className={style.cadastro_Inputs}
                        type='password'
                    />
                </div>
                <div>
                    <p className={style.cadastro_p}>Confirmar senha: </p>
                    <input
                        onChange={(evento) => setConfSenha(evento.target.value)}
                        value={confSenha}
                        className={style.cadastro_Inputs}
                        type='password'
                    />
                </div>
                <div className={style.cadastro_voltar_login}>
                    <p className={style.cadastro_text_voltar}>Já possui conta?</p>
                    <a className={style.cadastro_text_voltar} href='../'>Log-in</a>
                </div>
                <button className={style.cadastro_button_continuar} type='submit'>
                    Continuar
                </button>
            </form>
        </div>
    );
}

export default Cadastro;
