import { FC } from 'react';
import styles from './MenuItem.module.css';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  src: string;
  title: string;
  text: string;
  link: string;
}

export const MenuItem: FC<MenuItemProps> = ({ src, title, text, link }) => {
  const navigate = useNavigate();
  return (
    <div className={styles['menu-item__container']} onClick={() => navigate(link)}>
      <img src={src} className={styles['menu-item__img']} />
      <header className={styles['menu-item__header']}>
        <h2 className="m20med">{title}</h2>
        <p className="m14">{text}</p>
      </header>
    </div>
  );
};
