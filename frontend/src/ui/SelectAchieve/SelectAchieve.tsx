import { FC } from "react";
import styles from './SelectAchieve.module.css';
import { observer } from "mobx-react-lite";
import { BestExercise } from "@/modules/Achievements/types/types";

interface SelectAchieveProps {
    allEx?: BestExercise[];
    value: BestExercise | null;
    onChange: (exercise: BestExercise | null) => void;
}

export const SelectAchieve: FC<SelectAchieveProps> = observer(({
    allEx = [],
    value,
    onChange,
}) => {
    return (
        <div className={styles.select__container}>
            <select
                className={styles.select__element}
                value={value?.exercise_id ?? ""}
                onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedExercise = allEx.find(ex => String(ex.exercise_id) === selectedId) ?? null;
                    onChange(selectedExercise);
                }}
            >
                <option value="" disabled>
                    Выберите упражнение
                </option>
                {allEx.map((exercise) => (
                    <option key={exercise.exercise_id} value={exercise.exercise_id}>
                        {exercise.name_exercise}
                    </option>
                ))}
            </select>
        </div>
    );
});