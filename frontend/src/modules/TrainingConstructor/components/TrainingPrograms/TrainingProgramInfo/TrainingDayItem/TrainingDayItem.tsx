import { TrainingDay } from '@/modules/TrainingConstructor/types/types';
import { FC } from 'react';
import styles from './TrainingDayItem.module.css';
import { NavigationButton } from '@/ui/buttons/NavigationButton/NavigationButton';
import { observer } from 'mobx-react-lite';

interface TrainingDayItemProps {
  id_tr: number
  day: TrainingDay;
  index: number;
}
export const TrainingDayItem: FC<TrainingDayItemProps> = observer(({ id_tr, day, index }) => {
  return (
    <section className={styles['day']}>
      <div className={styles['day__container']}>
        <div className={styles['day__info']}>
          <span className={`${styles['day__number']} m24bold`}>{index + 1}</span>
          <h3 className={`${styles['day__name']} m16`}>{day.name}</h3>
        </div>
        <NavigationButton link={`/ProgramDayPage/${id_tr}/${index}`} />
      </div>
    </section>
  );
});
