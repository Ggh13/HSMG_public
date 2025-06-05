import { FC } from "react";
import styles from './SaveButton.module.css';

export const SaveButton: FC = () => {
  return (
    <button type="submit" className={styles.saveButton}>
      Сохранить
    </button>
  )
}