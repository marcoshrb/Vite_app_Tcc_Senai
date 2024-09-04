import {Link} from 'react-router-dom'

import style from './flip_card_small.module.css';

export default function FlipCardSmall({ Icon, Text_desc, To, SetVariable }) {

    return (
        <Link to={To} onClick={SetVariable}>
            <div className={style.flip_card_Small}>
                <div className={style.flip_card_inner}>
                    <div className={style.flip_card_inner}>
                        <div className={style.flip_card_front}>
                            <div className={style.item_link_flipCard_Small}>
                                <img src={Icon} alt="Icon" className={style.img_flipCard_Small} />
                            </div>
                        </div>
                        <div className={style.flip_card_back}>
                            <span>{Text_desc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}