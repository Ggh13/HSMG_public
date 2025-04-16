import React from 'react';
import styles from './Logo.module.css';
import HSMG from '../imgs/HSMG.svg';

export const Logo: React.FC = () => (
  <div className={styles.logo}>
    <img 
      src={HSMG} 
      alt="HSMG" 
    />
  </div>
);