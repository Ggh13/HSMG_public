import { FC, useState } from 'react';
import styles from './AddNewEx.module.css';
import { AddOneExerciseForm } from '../AddOneExerciseForm/AddOneExerciseForm';

interface AddNewExProps {
  day_index: number;
}
export const AddNewEx: FC<AddNewExProps> = ({ day_index }) => {
  const [showFirstForm, setShowFirstForm] = useState(true);
  return (
    <section className={styles['select-add-ex__container']}>
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
          Дроп-сет
        </button>
      </div>
      {showFirstForm ? <AddOneExerciseForm day_ind={day_index} /> : <></>}
    </section>
  );
};
