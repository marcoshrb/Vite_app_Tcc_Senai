import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Logo from './assets/logo_black.svg';
import viewPasswordIcon from './assets/view 1.svg'
import hidePasswordIcon from './assets/hide 1.svg'
import style from './login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'

export default function Login() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [hidePassword, setHidePassword] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formValid()) return;

        const login = { nome, senha };

        try {
            const response = await api.post("/user/login", login);

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

    function navigateCadastro() {
        navigate('/cadastro')
    }

    const changePassword = () => {
        setHidePassword(!hidePassword)
    }


    return (
        <div className={style.Login_all}>
            <div className={style.Login_div_Left}>
                <img src={Logo} alt='Logo' width={380} height={276} />
            </div >
            <div className={style.Login_div_Right}>

                <form onSubmit={handleSubmit} >
                    <h1 className={style.Login_bem_vindo}>Bem Vindo</h1>
                    <div style={{ padding: '15% 0% 15% 0% ', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                        <div style={{ width: '100%' }}>
                            <p className={style.Login_p}>Usuário: </p>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    onChange={(evento) => setNome(evento.target.value)}
                                    value={nome}
                                    className={style.Login_Inputs}
                                    type='text'
                                />
                            </InputGroup>
                        </div>
                        <div style={{ width: '100%' }}>
                            <p className={style.Login_p}>Senha: </p>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    onChange={(evento) => setSenha(evento.target.value)}
                                    value={senha}
                                    className={style.Login_Inputs}
                                    type={hidePassword ? 'text' : 'password'}
                                />
                                <Button variant="outline-secondary" id="button-addon2" onClick={() => changePassword()} style={{ borderRadius: '0px 50px 50px 0px' }}>
                                    <img src={hidePassword ? hidePasswordIcon : viewPasswordIcon} width={'30px'} />
                                </Button>
                            </InputGroup>
                        </div>
                        <div className={style.Login_Recuperar_senha}>
                            <p className={style.Login_p_Esqueceu}>Esqueceu sua senha?</p>
                            <a className={style.Login_p_Esqueceu} href='./recuperar_senha' style={{ textDecoration: 'none' }}>Recuperar</a>
                        </div>
                    </div>
                    <button className={style.login_button} type='submit'>Log in</button>
                </form>
                <button className={style.login_button_cadastro} onClick={navigateCadastro}>Cadastre-se</button>
            </div>
        </div>
    );
}
