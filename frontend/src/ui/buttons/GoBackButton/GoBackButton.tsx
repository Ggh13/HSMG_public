import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoBack from "@/ui/imgs/GoBackButton.svg"
import styles from './GoBackButton.module.css';

interface GoBackButtonProps {
  className?: string;
  onClick?: () => void;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ 
  className = '', 
  onClick 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      type='button'
      className={`${styles.goback_button} ${className}`}
      onClick={handleClick}
      aria-label="Назад"
    >
      <img 
        src={GoBack} 
        alt="Назад"
      />
    </button>
  );
};

export default GoBackButton;