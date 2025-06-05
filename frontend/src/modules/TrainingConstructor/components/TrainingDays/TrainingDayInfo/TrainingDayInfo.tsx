import { FC } from 'react';
import styles from './TrainingDayInfo.module.css';
import { TrainingDay } from '@/modules/TrainingConstructor/types/types';
import { observer } from 'mobx-react-lite';
import { EditHeader } from '@/components/editHeader/EditHeader';

interface TrainingDayInfoProps {
  id_tr: number
  training_day: TrainingDay;
  index: number;
}

export const TrainingDayInfo: FC<TrainingDayInfoProps> = observer(({ id_tr, training_day, index }) => {
  return (
    <header className={styles['training-day__main_info']}>
      <EditHeader link={`/ChangeTrainingDayData/${id_tr}/${index}`} to={`/ProgramPage/${id_tr}`}/>
      <div className={styles['training-day__title']}>
        <div className={`${styles["training-day__number"]} m32med`}>{index + 1}</div>
        <h2 className="m24med">{training_day.name}</h2>
      </div>
    </header>
  );
});
