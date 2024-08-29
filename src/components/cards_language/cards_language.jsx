import style from './cards_language.module.css'

export default function CardsLanguage({ TextLanguage }) {
    return (

        <button className={style.button_Language}>
            {TextLanguage}
        </button>

    )
}