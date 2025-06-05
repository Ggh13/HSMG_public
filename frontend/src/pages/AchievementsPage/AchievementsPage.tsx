import { StoreContext } from "@/app/provider";
import GoBackButton from "@/ui/buttons/GoBackButton/GoBackButton";
import { FC, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './AchievementsPage.module.css';
import { AddButton } from "@/ui/buttons/AddButton/AddButton";
import { AchieveList } from "@/modules/Achievements/components/AchieveList/AchieveList";
import background from "@/ui/imgs/archievements.svg";
import { observer } from "mobx-react-lite";

export const AchievementsPage: FC = observer(() => {
    const { id_user } = useParams();
    const { authStore, achievementsStore } = useContext(StoreContext);
    const navigate = useNavigate();
    const isOwner: boolean = Number(id_user) === Number(authStore?.user?.user_id);

    useEffect(() => {
        if (isOwner) {
            achievementsStore.fetchAchievements();
        } else {
            achievementsStore.fetchUserAchievements(Number(id_user));
        }
    }, [])
    return (
        <section className={styles["achieve__container"]}>
            <header className={styles["achieve__header"]}>
                <GoBackButton onClick={() => navigate(`/AccountPage/${id_user}`)} className={styles["back__button"]} />
                {isOwner?  <p className="m20med">Мои достижения</p> :
                 <p className="m20med">Достижения</p>}
            </header>
            {isOwner && <AddButton to="/AddAchievement" text="Добавить достижение" />}
            {achievementsStore.achieve_list.length > 0 ?
                <AchieveList achievements={achievementsStore.achieve_list} isOwner={isOwner}/>
                :
                <div className={styles["achieve__empty"]}>
                    <img src={background} className={styles["background__image"]} />
                    <div className={styles["no-achieve__text"]}>
                        {isOwner ?
                            <>
                                <p className="m16">Есть чем поделиться?</p>
                                <p className="m16">Скорее добавляй свое достижение!</p>
                            </> :
                            <p className="m16">Нет добавленных достижений</p>}

                    </div>
                </div>
            }

        </section>
    )
})