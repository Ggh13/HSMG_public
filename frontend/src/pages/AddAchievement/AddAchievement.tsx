import { AddAchieveForm } from "@/modules/Achievements/components/AddAchieveForm/AddAchieveForm";
import { FC } from "react";
import styles from './AddAchievements.module.css';

export const AddAchievement: FC = () => {
    return (
        <section className={styles["add-achieve__container"]}>
            <AddAchieveForm />
        </section>
    )
}