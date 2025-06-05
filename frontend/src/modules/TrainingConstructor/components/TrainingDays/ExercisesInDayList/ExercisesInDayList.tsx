import { Exercise } from '@/modules/TrainingConstructor/types/types';
import { FC } from 'react';
import styles from './ExercisesInDayList.module.css';
import { ExercisesInDayItem } from '../ExercisesInDayItem/ExercisesInDayItem';
import { observer } from 'mobx-react-lite';

interface ExercisesInDayListProps {
  exercises: Exercise[];
  day_ind: number;
}


export const ExercisesInDayList: FC<ExercisesInDayListProps> = observer(({ exercises, day_ind }) => {
  return (
    <div className={styles['ex-list__container']}>
      {exercises.length > 0 ? (
        <>
          {exercises.map((ex, index) => (
            <ExercisesInDayItem
              key={ex.exercise_id ?? index}
              exercise={ex}
              ex_ind={index}
              day_ind={day_ind}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
});
