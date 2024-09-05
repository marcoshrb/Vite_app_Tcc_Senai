import Logo from './assets/logo_black.svg';
import style from './login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'

export default function Login() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formValid()) return;

        const login = { nome, senha }; 

        try {
            const response = await api.post("/user/login", login); 
            console.log(response, 'dsadasdad')

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('authToken', token);

                navigate('/home');
            }
        } catch (error) {
            console.log('Erro ao fazer login:', error);
            alert('Falha ao autenticar. Verifique suas credenciais.');
        }
    }

    function formValid() {
        if (nome.length < 3) {
            alert('Insira um nome de usuário válido');
            return false;
        }
        if (senha.length < 3) {
            alert('Insira uma senha válida');
            return false;
        }
        return true;
    }

    function navigateCadastro(){
        navigate('/cadastro')
    }


    return (
        <div className={style.Login_all}>
            <div className={style.Login_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div>
            <form onSubmit={handleSubmit} className={style.Login_div_Right}>

                <h1 className={style.Login_bem_vindo}>Bem Vindo</h1>
                <div>
                    <p className={style.Login_p}>Usuário: </p>
                    <input
                        onChange={(evento) => setNome(evento.target.value)}
                        value={nome}
                        className={style.Login_Inputs}
                        type='text'
                    />
                </div>
                <div>
                    <p className={style.Login_p}>Senha: </p>
                    <input
                        onChange={(evento) => setSenha(evento.target.value)}
                        value={senha}
                        className={style.Login_Inputs}
                        type='password'
                    />
                </div>
                <div className={style.Login_Recuperar_senha}>
                    <p className={style.Login_p_Esqueceu}>Esqueceu sua senha?</p>
                    <a className={style.Login_p_Esqueceu} href=''>Recuperar</a>
                </div>
                <button className={style.login_button} type='submit'>Log in</button>
                <button className={style.login_button_cadastro} onClick={navigateCadastro}>Cadastre-se</button>
            </form>
        </div>
    );
}
