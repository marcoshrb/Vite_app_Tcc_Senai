import { useEffect, useState } from 'react';
import style from './modal_config.module.css';

export default function ModalConfig({ setVariable }) {
    // const [user, setUser] = useState('');
    // const [senha, setSenha] = useState('');
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');

    useEffect(() => {
        const getCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameras(videoDevices);
            } catch (error) {
                alert('Error fetching devices:', error);
            }
        };

        getCameras();
    }, []);



    return (
        <>
            <div id="myModal" className={style.modal}>
                <div className={style.modal_content}>
                    <button onClick={setVariable} className={style.close}>&times;</button>
                    <div className={style.modal_content_inputs}>
                        <p className={style.modal_title}>
                            Configurações
                        </p>

                        <div style={{ width: '80%' }}>
                            <p className={style.modal_p}>Câmera: </p>
                            <select
                                className={style.modal_dropdown} 
                                value={selectedCamera}
                                onChange={(e) => setSelectedCamera(e.target.value)}
                            >
                                {cameras.map(camera => (
                                    <option key={camera.deviceId} value={camera.deviceId} className={style.modal_dropdown_menu}>
                                        {camera.label || 'Unnamed Camera'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div style={{ width: '80%' }}>
                            <p className={style.modal_p}>Senha: </p>
                            <input onChange={(evento) => setUser(evento.target.value)} className={style.modal_Inputs} type='text' />
                        </div> */}
                        <button className={style.button_salvar}>SALVAR</button>
                    </div>
                </div>
            </div>
        </>

    );
}