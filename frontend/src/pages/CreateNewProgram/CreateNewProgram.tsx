import { CreateTrainingProgramForm } from "@/modules/TrainingConstructor/components/TrainingPrograms/CreateTrainingProgramForm/CreateTrainingProgramForm"
import { FC } from "react"
import styles from './CreateNewProgram.module.css';

export const CreateNewProgram: FC = () => {
    return (
        <section className={styles["createProgram__container"]}>
            <CreateTrainingProgramForm />
        </section>
    )
}