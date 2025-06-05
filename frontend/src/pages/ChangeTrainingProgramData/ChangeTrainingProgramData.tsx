import { TrainingProgramsEdit } from "@/modules/TrainingConstructor/components/TrainingPrograms/TrainingProgramsEdit/TrainingProgramsEdit";
import { FC } from "react";
import styles from './ChangeTrainingProgramData.module.css';

export const ChangeTrainingProgramData: FC = () => {
    return (
        <section className={styles["program-edit-form__container"]}>
            <TrainingProgramsEdit />
        </section>
    )
}