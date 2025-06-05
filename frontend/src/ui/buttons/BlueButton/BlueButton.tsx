import { FC } from 'react';
import styles from './BlueButton.module.css';

interface BlueButtonProps {
  text?: string;
  onClick?: () => void;
}

export const BlueButton: FC<BlueButtonProps> = ({text = "Сохранить", onClick }) => {
  return (
    <button onClick={onClick} type="submit" className={`m16med ${styles.saveButton}`}>
      {text}
    </button>
  );
};
