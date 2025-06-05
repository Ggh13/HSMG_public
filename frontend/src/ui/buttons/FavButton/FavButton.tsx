// FavButton.tsx
import { FC } from 'react';
import addedFav from '@/ui/imgs/added_fav_blue.svg';
import unaddedFav from '@/ui/imgs/fav_blue.svg';
import styles from './FavButton.module.css';

interface FavButtonProps {
  isFav: boolean;
  onClick: () => void;
}

export const FavButton: FC<FavButtonProps> = ({ isFav, onClick }) => {
  return (
    <button className={styles['favButton']} onClick={onClick}>
      <img
        src={isFav ? addedFav : unaddedFav}
        alt={isFav ? 'В избранном' : 'Не в избранном'}
      />
    </button>
  );
};
