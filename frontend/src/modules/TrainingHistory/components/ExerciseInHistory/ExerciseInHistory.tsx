import { FC } from 'react';
import { TrainingEntry } from '../../types';
import styles from './ExerciseInHistory.module.css';
import weight from '@/ui/imgs/small_weight.svg';
import count from '@/ui/imgs/repeat.svg';
interface ExerciseInHistoryProps {
  exercise: TrainingEntry;
}

export const ExerciseInHistory: FC<ExerciseInHistoryProps> = ({ exercise }) => {
  return (
    <div className={styles["exercise__constainer"]}>
      <h3 className={`m20bold ${styles['exercise__name']}`}>{exercise.Training_ex.name}</h3>
      <span className={`m14 ${styles['exercise__date']}`}>{exercise.date.slice(0, 16)}</span>
      <div className={styles['exercise__statistic']}>
        <div className={styles['exercise__weight']}>
          <img className={styles['exercise__weight-img']} src={weight} alt="Вес" />
          <span className={`m14 ${styles['exercise__weight-number']}`}>
            {exercise.Training_ex.approaches[0]?.in_progress_ex.done_weight} кг
          </span>
        </div>
        <div className={styles['exercise__count']}>
          <img className={styles['exercise__count-img']} src={count} alt="Кол-во повторений" />
          <span className={`m14 ${styles['exercise__count-number']}`}>
            {exercise.Training_ex.approaches[0]?.in_progress_ex.done_count} повторов
          </span>
        </div>
      </div>
    </div>
  );
};
