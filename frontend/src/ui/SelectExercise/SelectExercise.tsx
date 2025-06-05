import { FC } from "react";
import styles from "./SelectExercise.module.css";
import { ExerciseFromLib } from "@/modules/TrainingConstructor/types/types";
import { observer } from "mobx-react-lite";

interface SelectExerciseProps {
  allEx?: ExerciseFromLib[]; 
  value: ExerciseFromLib | null;
  onChange: (exercise: ExerciseFromLib | null) => void;
}

export const SelectExercise: FC<SelectExerciseProps> = observer(({
  allEx = [],
  value,
  onChange,
}) => {
  return (
    <div className={styles.select__container}>
      <select
        className={styles.select__element}
        value={value?.id ?? ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedExercise = allEx.find(ex => String(ex.id) === selectedId) ?? null;
          onChange(selectedExercise);
        }}
      >
        <option value="" disabled>
          Выберите упражнение
        </option>
        {allEx.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>
    </div>
  );
});