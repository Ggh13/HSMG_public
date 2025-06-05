import { BackButton } from '@/ui/buttons/BackButton/BackButton';
import { FC } from 'react';
import styles from './BasicHeader.module.css';

interface BasicHeaderProps {
  onClick?: () => void,
}

export const BasicHeader: FC<BasicHeaderProps> = ({ onClick }) => {
  return (
    <header className={styles['basic-header__container']}>
      <BackButton onClick={onClick} />
    </header>
  );
};
