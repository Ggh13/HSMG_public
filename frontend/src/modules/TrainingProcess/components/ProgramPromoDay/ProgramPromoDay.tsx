import { FC } from 'react';
import { Day } from '../../types/types';
import styles from './ProgramPromoDay.module.css';
import doneEx from "@/ui/imgs/doneEx.svg"
interface ProgramPromoDayProps {
  day: Day;
}

export const ProgramPromoDay: FC<ProgramPromoDayProps> = ({ day }) => {

  return (
    <div className={styles['day__container']}>
      <div className={`m16 ${styles['day__name']}`}>{day.name} </div>
      {day.flag&& <img src={doneEx} alt="" /> }
    </div>
  );
};
