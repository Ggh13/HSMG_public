import { FC } from "react";
import { useNavigate } from "react-router-dom";
import plus from '@/ui/imgs/bluePlus.svg';
import styles from './PlusAddButtonWithText.module.css';

interface PlusAddButtonWithTextProps {
    link?: string;
    text: string;
    onClick?: () => void;
}
export const PlusAddButtonWithText: FC<PlusAddButtonWithTextProps> = ({ link, text, onClick }) => {
    const navigate = useNavigate();
    return (
        <div className={styles["add-button__container"]}>
            <button
                type="button"
                className={styles["add__button"]}
                onClick={link ? () => navigate(link) : onClick}
            >
                <img src={plus} />
                <p className="m14">{text}</p>
            </button>
        </div>
    )
}
