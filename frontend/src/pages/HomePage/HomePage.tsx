import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import { MobileHeader } from "@/components/header/ui/MobileHeader";
import manHomePage from '@/ui/imgs/manHomePage.svg';
import weightHomePage from '@/ui/imgs/weightHomePage.svg';
import armHomePage from '@/ui/imgs/armHomePage.svg';
import lightningHomePage from '@/ui/imgs/lightningHomePage.svg';
import cupHomePage from '@/ui/imgs/cupHomePage.svg';
import progressHomePage from '@/ui/imgs/progressHomePage.svg'
import a from '@/ui/imgs/a.svg';
import styles from './HomePage.module.css';
import { FC, useContext } from "react";
import { StoreContext } from "@/app/provider";

export const  HomePage:FC = observer(() => {
  const {authStore} = useContext(StoreContext);
  

  return (
    <div className={styles.home__container}>
      <MobileHeader />
      <div className={styles.home__content}>
        <h1 className={`${styles.home__title} m36`}>
          Открывай новые тренировки.<br />
          Вдохновляй своим прогрессом.
        </h1>
        <Link to={authStore.isAuth ? `/AccountPage/${authStore.user.user_id}` : "/login"} className={`${styles.home__link} m20bold`}>
          Начать тренироваться <img className={styles.home__linkIcon} src={a} alt="" />
        </Link>
      </div>
      <div className="home__background">
        <img src={manHomePage} alt="" className={`${styles.home__img} ${styles.man__icon}`} />
        <img src={weightHomePage} alt="" className={`${styles.home__img} ${styles.weight__icon}`} />
        <img src={armHomePage} alt="" className={`${styles.home__img} ${styles.arm__icon}`} />
        <img src={lightningHomePage} alt="" className={`${styles.home__img} ${styles.lightning__icon}`} />
        <img src={cupHomePage} alt="" className={`${styles.home__img} ${styles.cup__icon}`} />
        <img src={progressHomePage} alt="" className={`${styles.home__img} ${styles.progress__icon}`} />
      </div>
    </div>
  );
});