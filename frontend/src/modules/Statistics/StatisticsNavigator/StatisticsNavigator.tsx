import { NavigationButton } from "@/ui/buttons/NavigationButton/NavigationButton"
import { FC } from "react"
import styles from './StatisticsNavigator.module.css';

interface StatisticsNavigatorProps {
    user_id: number;
}

export const StatisticsNavigator: FC<StatisticsNavigatorProps> = ({ user_id }) => {
    return (
        <div className={styles["section"]}>
            <div className={styles["section__header"]}>
                <h2 className={`${styles["section__title"]} m20`}>Статистика</h2>
            </div>
            <div className={styles["section__content"]}>
                <div className={styles["section__element"]}>
                    <p className="m16">По силовым показателям</p>
                    <NavigationButton link={`/TrainingStatisticsPage/${user_id}`} />
                </div>
                <div className={styles["section__element"]}>
                    <p className="m16">По антропометрии</p>
                    <NavigationButton link={`/AnthropometryStatisticsPage/${user_id}`} />
                </div>
            </div>
        </div>
    )
}