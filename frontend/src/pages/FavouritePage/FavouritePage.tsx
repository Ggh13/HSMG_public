import { StoreContext } from "@/app/provider";
import { FavList } from "@/modules/FavouritePrograms/components/FavList/FavList";
import { FC, useContext, useEffect } from "react";
import styles from './FavouritePage.module.css';
import { BasicHeader } from "@/components/basicHeader/BasicHeader";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const FavouritePage: FC = observer(() => {
    const { favouriteProgramsStore } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        favouriteProgramsStore.fetchFavouritePrograms();
    }, [])
    return (
        <section className={styles["fav-page__container"]}>
            <div className={styles["fav-page__header"]}>
                <BasicHeader onClick={() => navigate(`/TrainingMenu`)} />
                <h2 className="m24med">Избранные программы</h2>
            </div>
            <FavList programs={favouriteProgramsStore.fav_programs} />
        </section>
    )
})