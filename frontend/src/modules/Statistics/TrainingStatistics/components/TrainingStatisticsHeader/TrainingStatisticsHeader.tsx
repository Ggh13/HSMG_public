import { FC } from "react";
import styles from './TrainingStatisticsHeader.module.css';

export const TrainingStatisticsHeader: FC = () => {
    return (
        <header className={styles["stat-header__container"]}>
            <h2 className="m24bold">Тренировочная статистика</h2>
            <p className="m14">Для корректной работы графика рекомендуем провести минимум 3 дня тренировок</p>
        </header>
    )
}