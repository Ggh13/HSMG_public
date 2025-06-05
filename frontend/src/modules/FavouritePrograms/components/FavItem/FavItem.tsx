import { GeneralProgramInformation } from "@/modules/Searching/ProgramsSearch/types/types";
import { Avatar } from "@/ui/avatar/Avatar";
import { FC } from "react";
import styles from "./FavItem.module.css";

interface FavItemProps {
    program: GeneralProgramInformation;
    onClick: () => void;
}

export const FavItem: FC<FavItemProps> = ({ program, onClick }) => {
    return (
        <section className={styles["fav-item__container"]} onClick={onClick}>
            <Avatar src={program.image} size={80} />
            <div className={styles["fav-item__title"]}>
                <h2 className="m20">{program.name}</h2>
                <p className="m16"> {program.description.length > 10
                    ? `${program.description.slice(0, 10)}...`
                    : program.description}
                </p>
            </div>
        </section>
    )
}