import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../ui/logo/Logo';
import { LogoutButton } from '@/ui/buttons/LogoutButton/LogoutButton';
import tg from '../../../ui/imgs/tg.svg';
import styles from "./MobileHeader.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
  isAuth: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  onLogoutClick,
  isAuth
}) => (
  <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
    <div className={styles.menu__header}>
      <Logo />
      <button className={styles.menu__close_button} onClick={onClose}>
        ✕
      </button>
    </div>
    
    <div className={styles.menu__content}>
      {isAuth ? (
        <>
          <Link to="/referral" className={`${styles.menu__link} m20`}>
            Реферальная программа
          </Link>
          <Link to="/contact" className={`${styles.menu__link} m20`}>
            Связаться с нами
          </Link>
          <TelegramLink />
          <LogoutButton onClick={onLogoutClick} />
        </>
      ) : (
        <>
          <Link to="/account" className={`${styles.menu__link} m20`}>
            Личный кабинет
          </Link>
          <Link to="/contact" className={`${styles.menu__link} m20`}>
            Связаться с нами
          </Link>
          <TelegramLink />
        </>
      )}
    </div>
  </div>
);


const TelegramLink = () => (
  <a href="https://t.me/yourtelegram" className={styles.menu__link}>
    <img src={tg} alt="Telegram" />
  </a>
);

