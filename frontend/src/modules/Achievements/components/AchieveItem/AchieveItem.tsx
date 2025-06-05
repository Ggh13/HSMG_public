import { FC, useContext } from "react";
import { Achievement } from "../../types/types";
import styles from './AchieveItem.module.css';
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { BlackDeleteButton } from "@/ui/buttons/BlackDeleteButton/BlackDeleteButton";
import { StoreContext } from "@/app/provider";

interface AchieveItemProps {
    achieve: Achievement;
    isOwner: boolean;
}

export const AchieveItem: FC<AchieveItemProps> = ({ achieve, isOwner }) => {
    const { achievementsStore } = useContext(StoreContext);

    const handleDelete = async () => {
        await achievementsStore.deleteAchieve(achieve.id);
        await achievementsStore.fetchAchievements();
    }
    return (
        <section className={styles["achieve-item__container"]}>
            <div className={styles["achieve-item__header"]}>
                <p className="m16">{achieve.name_exercise}: {achieve.weight} на {achieve.count} повторений</p>
                {isOwner &&
                    <div className={styles["achieve-item__delete"]}>
                        <BlackDeleteButton onClick={handleDelete} />
                    </div>
                }
            </div>
            <div className={styles["achieve-item__video"]}>
                {achieve.record_video != "" &&
                    <VideoPlayer videoUrl={achieve.record_video} />}
            </div>
        </section>
    )
}