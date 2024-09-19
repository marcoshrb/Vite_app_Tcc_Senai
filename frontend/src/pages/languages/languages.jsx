import LogoBlack from '../../assets/logo_black.svg'
import Vector from './assets/Vector.svg'

import CardsLanguage from '../../components/cards_language/cards_language'
import FlipCardSmall from '../../components/flip_card_small/flip_card_small'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import style from './languages.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LanguageScreen() {

    const token = localStorage.getItem('authToken')
    const navigate = useNavigate();

    useEffect(() => {
        if (token) return

        navigate('/')
    }, [token, navigate])
    
    return (
        <div className={style.all_LanguageScreen}>
            <div style={{position: "absolute", top: "10px", left: "10px", width: "150px", height: "150px", zIndex: "999"}}>
                <FlipCardSmall Icon={Vector} Text_desc={'Voltar'} To={'../home'}/>
            </div>
            <div className={style.language_display_img}>
                <img src={LogoBlack} alt='Logo' />
            </div>
            <Container className={style.Container_Languages}>
                <Row className={style.Row_optins_languages}>

                    <Col xs={5} className={style.Col_optins_languages}>
                        <CardsLanguage TextLanguage={'ENGLISH'} />
                        <CardsLanguage TextLanguage={'ENGLISH'} />
                        <CardsLanguage TextLanguage={'ENGLISH'} />
                    </Col>
                    <Col xs={5} className={style.Col_optins_languages}>
                        <CardsLanguage TextLanguage={'ENGLISH'} />
                        <CardsLanguage TextLanguage={'ENGLISH'} />
                        <CardsLanguage TextLanguage={'ENGLISH'} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}