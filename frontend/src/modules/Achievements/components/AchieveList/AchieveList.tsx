import { FC } from "react";
import { Achievement } from "../../types/types";
import { AchieveItem } from "../AchieveItem/AchieveItem";
import styles from './AchieveList.module.css';
import { observer } from "mobx-react-lite";

interface AchieveListProps {
    achievements: Achievement[];
    isOwner: boolean;
}

export const AchieveList: FC<AchieveListProps> = observer(({ achievements, isOwner }) => {
    return (
        <section className={styles["achieve-list__container"]}>
            {achievements.map((achieve) => (
                <AchieveItem achieve={achieve} key={achieve.id} isOwner={isOwner} />
            ))}
        </section>
    )
})