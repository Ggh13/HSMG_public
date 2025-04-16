import { FC } from "react";
import styles from "./MobileFooter.module.css";
import { Link } from "react-router-dom";
import profileLink from "@/ui/imgs/profileLink.svg";
import searchLink from "@/ui/imgs/searchLink.svg";
import hzLink from "@/ui/imgs/hzLink.svg";
interface MobileFooterProps {
  user_id: number | null;
}

export const MobileFooter: FC<MobileFooterProps> = ({ user_id }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <nav className={styles.footer__nav}>
          <Link
            className={styles.footer__link}
            to={`/AccountPage/${user_id}`}
          >
            <img
              className={styles.footer__img}
              src={profileLink}
              alt="Изменить данные"
            />
          </Link>
          <Link className={styles.footer__link} to="/SearchUsers">
            <img
              className={styles.footer__img}
              src={searchLink}
              alt="Изменить данные"
            />
          </Link>
          <Link className={styles.footer__link} to="/Trainings">
            <img
              className={styles.footer__img}
              src={hzLink}
              alt="Изменить данные"
            />
          </Link>
        </nav>
      </div>
    </div>
  );
};
