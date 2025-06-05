import { BackButton } from '@/ui/buttons/BackButton/BackButton';
import { FC } from 'react';
import styles from './EditHeader.module.css';
import { Link, To, useNavigate } from 'react-router-dom';

interface EditHeaderPropr {
  link: string;
  to: To;
}

export const EditHeader: FC<EditHeaderPropr> = ({ link, to }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.editHeader}>
      <BackButton onClick={() => navigate(to)}/>
      <Link to={link} className={`${styles['edit__button']} m14med`}>
        Изменить
      </Link>
    </div>
  );
};
