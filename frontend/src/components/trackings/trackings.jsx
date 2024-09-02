import EyeIcon from "./assets/scanner-de-olho.svg";
import HandIcon from "./assets/pare.svg";
import FaceIcon from "./assets/id-do-rosto-white.svg";

import FlipCard from "../flip_card/flip_card";

import style from "./trackings.module.css";

export default function Trackings() {
  return (
    <div className={style.nav__Trackings}>
      <nav>
        <ul className={style.lista_sidebar_trackings}>
          <li>
            <FlipCard Icon={EyeIcon} Text_desc={"Eye Tracking"} To={"./eye-tracking"}/>
          </li>
          <li>
            <FlipCard Icon={HandIcon} Text_desc={"Hand Tracking"} To={"./hand-tracking"} />
          </li>
          <li>
            <FlipCard Icon={FaceIcon} Text_desc={"Face Tracking"} To={"./face-tracking"} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
