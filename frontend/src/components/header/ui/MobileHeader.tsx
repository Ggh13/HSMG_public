import React, { useState, useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '@/app/provider';
import { MobileMenu } from './MobileMenu';
import { ConfirmModal } from './ConfirmModal';
import { Logo } from '@/ui/logo/Logo';
import Burger from '@/ui/imgs/burger.svg';
import ProfileLinkImg from '@/ui/imgs/profileLink.svg';
import styles from "./MobileHeader.module.css";

export const MobileHeader: React.FC = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { authStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Logo />
        <HeaderButtons 
          isAuth={authStore.isAuth} 
          onMenuToggle={toggleMenu} 
        />
        
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={closeMenu}
          onLogoutClick={openConfirm}
          isAuth={authStore.isAuth}
        />
      </div>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={() => {authStore.logout(); navigate('/login')}}
      />
    </div>
  );
});


const HeaderButtons: React.FC<{ 
  isAuth: boolean; 
  onMenuToggle: () => void 
}> = ({ isAuth, onMenuToggle }) => (
  <div className={styles.header__buttons}>
    {!isAuth && <ProfileLink />}
    <button className={styles.header__button} onClick={onMenuToggle}>
      <img src={Burger} alt="" />
    </button>
  </div>  
);

const ProfileLink = () => (
  <Link to="/account" className={styles.header__link}>
    <img src={ProfileLinkImg} alt="Profile" />
  </Link>
);