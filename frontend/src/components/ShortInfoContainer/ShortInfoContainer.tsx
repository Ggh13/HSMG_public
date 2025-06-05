import { NavigationButton } from '@/ui/buttons/NavigationButton/NavigationButton';
import { FC } from 'react';
import styles from './ShortInfoContainer.module.css';

interface ShortInfoContainerProps {
  title: string;
  link: string;
  children: React.ReactNode;
}
export const ShortInfoContainer: FC<ShortInfoContainerProps> = ({ title, link, children }) => {
  return (
    <div className={styles['account__trainingPrograms']}>
      <div className={styles['trainingPrograms__header']}>
        <h2 className={`${styles['trainingPrograms__title']} m20`}>{title}</h2>
        <NavigationButton link={link} />
      </div>
      <div className={styles['trainingPrograms__main']}>{children}</div>
    </div>
  );
};
