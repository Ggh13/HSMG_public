import { FC } from "react";
import styles from './AnthropometryStatisticsHeader.module.css';

export const AnthropometryStatisticsHeader: FC = () => {
    return (
        <header className={styles["stat-header__container"]}>
            <h2 className="m24bold">Статистика по антропоментрии</h2>
            <p className="m14">Для корректной работы графика, рекомендуем провести несколько замеров</p>
        </header>
    )
}