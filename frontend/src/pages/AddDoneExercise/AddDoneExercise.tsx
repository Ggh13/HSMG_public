import { FC, useState } from 'react';
import styles from './AddDoneExercise.module.css';
import { AddDoneExerciseForm } from '@/modules/TrainingProcess/components/AddDoneExerciseForm/AddDoneExerciseForm';
import { ArrowBackButton } from '@/ui/buttons/ArrowBackButton/ArrowBackButton';

export const AddDoneExercise: FC = () => {
  const [showFirstForm, setShowFirstForm] = useState(true);
  return (
    <section className={styles['select-add-ex__container']}>
      <ArrowBackButton src={'/TrainingHistory'} />

      <h2 className="m24med">Добавить новое упражнение</h2>
      <div className={styles['select__buttons']}>
        <button
          onClick={() => setShowFirstForm(true)}
          className={`${styles['select__button']} ${showFirstForm ? `${styles['button__active']} m16med` : 'm16'}`}
        >
          Одиночное упражнение
        </button>
        <button
          onClick={() => setShowFirstForm(false)}
          className={`${styles['select__button']} ${!showFirstForm ? `${styles['button__active']} m16med` : 'm16'} `}
        >
          Видео упражнения
        </button>
      </div>
      {showFirstForm ? <AddDoneExerciseForm /> : <></>}
    </section>
  );
};
