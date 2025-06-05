import { GeneralProgramInformation } from "@/modules/Searching/ProgramsSearch/types/types";
import { FC } from "react";
import { FavItem } from "../FavItem/FavItem";
import { useNavigate } from "react-router-dom";
import styles from "./FavList.module.css";
import { observer } from "mobx-react-lite";

interface FavListProps {
    programs: GeneralProgramInformation[];
}

export const FavList: FC<FavListProps> = observer(({ programs }) => {
    const navigate = useNavigate();
    return (
        <section className={styles["fav-list__container"]}>
            {programs.length > 0 ?
                programs.map((program) => (
                    <FavItem program={program} onClick={() => navigate(`/ProgramPromo/${program.statistics_training}`)} />
                )) :
                <p className="m16">Нет избранных программ</p>}
        </section>
    )
})