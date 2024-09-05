import { useState } from 'react';
import api from '../../services/api';

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
        <div>
            <h1>Recuperar Senha</h1>
            {!isCodeSent ? (
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                    />
                    <button onClick={handleSendCode}>Enviar Código</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Digite o código recebido"
                    />
                    <button onClick={handleVerifyCode}>Verificar Código</button>
                </div>
            )}
            {isCodeValid && <p>Código validado. Agora você pode redefinir sua senha.</p>}
        </div>
    );
}
