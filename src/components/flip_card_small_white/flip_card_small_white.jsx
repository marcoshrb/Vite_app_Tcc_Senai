import { Link } from 'react-router-dom'

import style from './flip_card_small_white.module.css';

export default function FlipCardSmallNavbar({ Icon, Text_desc, To }) {
    return (
        <Link to={To}>
            <div className={style.flip_card_Small_Navbar}>
                <div className={style.flip_card_inner_Navbar}>
                    <div className={style.flip_card_inner_Navbar}>
                        <div className={style.flip_card_front_Navbar}>
                            <a href="#" className={style.item_link_flipCard_Small_Navbar}>
                                <img src={Icon} alt="" />
                            </a>
                        </div>
                        <div className={style.flip_card_back_Navbar}>
                            <span>{Text_desc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}