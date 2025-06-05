import { CreateTrainingDayForm } from "@/modules/TrainingConstructor/components/TrainingDays/CreateTrainingDayForm/CreateTrainingDayForm";
import { FC } from "react";
import styles from './CreateNewDay.module.css';


export const CreateNewDay: FC = () => {
    return (
        <section className={styles["add-day__container"]}>
            <CreateTrainingDayForm />
        </section>
    )
}