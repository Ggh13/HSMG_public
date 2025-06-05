import { BackButton } from '@/ui/buttons/BackButton/BackButton';
import { FC } from 'react';
import styles from './ProcessHeader.module.css';

interface ProcessHeaderProps {
  onClick?: () => void,
}

export const ProcessHeader: FC<ProcessHeaderProps> = ({ onClick }) => {
  return (
    <header className={styles['process-header__container']}>
      <BackButton onClick={onClick} />
    </header>
  );
};
