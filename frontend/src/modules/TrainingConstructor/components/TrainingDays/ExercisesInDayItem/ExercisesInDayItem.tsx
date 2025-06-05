import { FC } from 'react';
import styles from './ExerciseInDayItem.module.css';
import { Exercise } from '@/modules/TrainingConstructor/types/types';
import { observer } from 'mobx-react-lite';
import info from '@/ui/imgs/info.svg'
import { useNavigate } from 'react-router-dom';

interface ExercisesInDayItemProps {
  exercise: Exercise;
  day_ind: number;
  ex_ind: number;
}

export const ExercisesInDayItem: FC<ExercisesInDayItemProps> = observer(({ exercise, day_ind, ex_ind }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className={styles['ex__container']}>
        <p className={`${styles['ex__header']} m12`}>{exercise.name}</p>
        <div>
          <img src={info} onClick={() => navigate(`/ChangeExerciseData/${day_ind}/${ex_ind}`)} />
        </div>
      </div>
      <hr className={styles['exs__line']} />
    </>
  );
});
