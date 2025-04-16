import React from 'react';
import styles from './LogoutButton.module.css';

interface LogoutButtonProps {
  onClick: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  onClick
}) => (
  <button 
    className={styles.header__button_logout}
    onClick={onClick}
  >
    Выйти из аккаунта
  </button>
);