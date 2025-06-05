import React, { useState } from 'react';
import styles from './TrainingStatisticsMenu.module.css';

interface TrainingStatisticsMenuProps {
    buttons: {
        id: string;
        label: string;
    }[];
    defaultSelected?: string;
    onButtonChange?: (selectedId: string) => void;
}

export const TrainingStatisticsMenu: React.FC<TrainingStatisticsMenuProps> = ({
    buttons,
    defaultSelected,
    onButtonChange,
}) => {
    const [selected, setSelected] = useState<string>(defaultSelected || buttons[0]?.id || '');

    const handleClick = (id: string) => {
        setSelected(id);
        if (onButtonChange) {
            onButtonChange(id);
        }
    };

    return (
        <section>
            <div className={styles["stat-menu__container"]}>
                {buttons.map((button) => (
                    <button
                        key={button.id}
                        className={`${styles["stat-menu__button"]} ${selected === button.id ? styles["active"] : ''}`}
                        onClick={() => handleClick(button.id)}
                    >
                        <p className='m16med'>
                            {button.label}
                        </p>
                    </button>
                ))}
            </div>
        </section>
    );
};

