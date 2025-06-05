import { FC } from 'react';
import { Day } from '../../types/types';
import { ProgramPromoDay } from '../ProgramPromoDay/ProgramPromoDay';
import styles from './ProgramPromoDaysList.module.css';

interface ProgramPromoDaysListProps {
  days: Day[];
}

export const ProgramPromoDaysList: FC<ProgramPromoDaysListProps> = ({ days }) => {
  return (
    <div className={styles['days__container']}>
      <h2 className={`m20bold ${styles['days__title']}`}>Программа тренировок</h2>
      {!days || days.length === 0 ? (
        <p className="m16med">Нет тренирочных дней</p>
      ) : (
        <ul className={styles['days__list']}>
          {days?.map((day) => (
            <li key={day.week_day}>
              <ProgramPromoDay day={day} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
