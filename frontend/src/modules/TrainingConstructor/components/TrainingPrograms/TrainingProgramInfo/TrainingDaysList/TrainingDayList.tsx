import { TrainingProgram } from '@/modules/TrainingConstructor/types/types';
import { FC } from 'react';
import styles from './TrainingDayList.module.css';
import { TrainingDayItem } from '../TrainingDayItem/TrainingDayItem';
import { observer } from 'mobx-react-lite';

interface TrainingDayListProps {
  training_program: TrainingProgram;
}
export const TrainingDayList: FC<TrainingDayListProps> = observer(({ training_program }) => {
  return (
    <section className={styles['program__days']}>
      <div className={styles['days__container']}>
        {training_program.training_days?.map((day, index) => (
          <TrainingDayItem day={day} index={index} key={index} id_tr={training_program.training_id}/>
        ))}
      </div>
    </section>
  );
});
