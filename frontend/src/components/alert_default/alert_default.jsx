import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import style from './alert_default.module.css';

export default function AlertDefault({ titulo, mensagem }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000); 

        return () => {
            clearTimeout(timer); 
        };
    }, []);

    if (show) {
        return (
            <div className={style.AlertComponent}>
                <Alert variant="danger" className={style.Alert}>
                    <Alert.Heading>{titulo}</Alert.Heading>
                    <p>{mensagem}</p>
                </Alert>
            </div>
        );
    }

    return null; 
}
