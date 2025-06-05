import { UserTrainingPrograms } from "@/modules/TrainingConstructor/components/TrainingPrograms/UserTrainingPrograms/UserTrainingPrograms";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from './UserTrainingProgramsPage.module.css';


export const UserTrainingProgramsPage: FC = observer(() => {
    const { userId } = useParams();

    return (
        <section className={styles["programs__container"]}>
            <UserTrainingPrograms userId={String(userId)} />
        </section>
    )
})