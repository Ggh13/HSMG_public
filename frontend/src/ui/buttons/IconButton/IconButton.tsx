import React from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps {
  iconSrc: string;
  altText: string;
  onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  iconSrc, 
  altText, 
  onClick,
}) => (
  <button 
    className={styles.iconButton}
    onClick={onClick}
  >
    <img src={iconSrc} alt={altText} />
  </button>
);