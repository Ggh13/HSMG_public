import { ExerciseEdit } from "@/modules/TrainingConstructor/components/Exercises/ExerciseEdit/ExerciseEdit";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from './ChangeExerciseData.module.css';

export const ChangeExerciseData: FC = () => {
    const { index_day, index_ex } = useParams();
    return (
        <div className={styles["exercise-edit-form__container"]}>
            <ExerciseEdit index_day={Number(index_day)} index_ex={Number(index_ex)} />
        </div>
    )
} 