import { useState } from 'react';

import api from '../../services/api';
import style from './recover.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RecoverPassword() {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeValid, setIsCodeValid] = useState(false);

    const handleSendCode = async () => {
        try {
            await api.post('/user/recover', { email });
            setIsCodeSent(true);
            alert('Código de recuperação enviado para o seu e-mail.');
        } catch (error) {
            console.error('Erro ao enviar código:', error);
            alert('Erro ao enviar código. Verifique o e-mail e tente novamente.');
        }
    };

    const handleVerifyCode = async () => {
        try {
            await api.post('/user/verify-code', { email, code });
            setIsCodeValid(true);
            alert('Código verificado com sucesso.');
        } catch (error) {
            console.error('Erro ao verificar código:', error);
            alert('Código inválido. Tente novamente.');
        }
    };

    return (
        <div className={style.Page}>
            <div className={style.card}>
                <h1>Recuperar Senha</h1>
                {!isCodeSent ? (

                    <div>
                        <Form onSubmit={handleSendCode}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <div>
                        <Form onSubmit={handleVerifyCode}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Digite o código recebido" 
                                    onChange={(e) => setCode(e.target.value)} 
                                    value={code}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Verificar Código
                            </Button>
                        </Form>
                    </div>
                )}
                {isCodeValid && <p>Código validado. Agora você pode redefinir sua senha.</p>}
            </div>
        </div>
    );
}
