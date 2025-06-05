import { TrainingDayEdit } from "@/modules/TrainingConstructor/components/TrainingDays/TrainingDayEdit/TrainingDayEdit";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from './ChangeTrainingDayData.module.css';

export const ChangeTrainingDayData: FC = () => {
    const { index } = useParams();

    return (
        <section className={styles["day-edit-form__container"]}>
            <TrainingDayEdit index={Number(index)} />
        </section>
    )
}