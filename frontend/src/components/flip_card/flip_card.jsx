import {Link} from 'react-router-dom'

import style from "./flip_card.module.css";

export default function FlipCard({ Icon, Text_desc, To }) {

  return (
    <Link to={To}>
      <div className={style.flip_card}>
        <div className={style.flip_card_inner}>
          <div className={style.flip_card_inner}>
            <div className={style.flip_card_front}>
              <div className={style.item_link_flipCard}>
                <img src={Icon} alt="Icon" width={100} height={100}/>
              </div>
            </div>
            <div className={style.flip_card_back}>
              <span>{Text_desc}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
