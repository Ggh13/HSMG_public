import { FC, useState } from 'react';
import { Modal } from '@/ui/Modals/Modal';
import styles from './ExerciseInputModal.module.css';

interface Props {
  onClose: () => void;
  onSave: (weight: number, reps: number) => void;
}

export const ExerciseInputModal: FC<Props> = ({ onClose, onSave }) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const handleSave = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (!isNaN(w) && !isNaN(r)) {
      onSave(w, r);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Введите свои значения</h2>
        <input
          className={styles.input}
          type="number"
          placeholder="Вес"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Количество повторов"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button className={styles.saveButton} onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </Modal>
  );
};
