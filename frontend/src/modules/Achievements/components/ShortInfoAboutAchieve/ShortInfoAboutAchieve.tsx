import { StoreContext } from "@/app/provider";
import { AccountSectionBlock } from "@/modules/Profile/components/AccoutSectionBlock/AccountSectionBlock";
import { FC, useContext, useEffect } from "react";
import styles from "./ShortInfoAboutAchieve.module.css";
import { observer } from "mobx-react-lite";
import { Loader } from "@/ui/loader/Loader";

interface ShortInfoAboutAchieveProps{
    id_user: number;
}

export const ShortInfoAboutAchieve: FC<ShortInfoAboutAchieveProps> = observer(({id_user}) => {
    const { authStore, achievementsStore } = useContext(StoreContext);
    const isOwner: boolean = Number(id_user) === Number(authStore?.user?.user_id)

    useEffect(() => {
        if(isOwner) {
            achievementsStore.fetchAchievements();
        } else {
            achievementsStore.fetchUserAchievements(id_user);
        }
    }, [])
    if (achievementsStore.loading) return <Loader />
    return (
        <AccountSectionBlock
            title={isOwner ? "Мои достижения" : "Достижения"}
            link={`/AchievementsPage/${id_user}`}>
            <div className={styles["achieve-el__container"]}>
                {achievementsStore.achieve_list.length > 0 ?
                    achievementsStore.achieve_list.slice(
                        achievementsStore.achieve_list.length - 2,
                        achievementsStore.achieve_list.length,
                    ).map((achieve) => (
                        <div key={achieve.id} className={styles["achieve__element"]}>
                            <p className="m16">{achieve.name_exercise}: {achieve.weight} на {achieve.count} повторений</p>
                        </div>
                    )) : isOwner ? <p className="m16">Скорее добавляй свои спортивные успехи!</p> :
                    <p className="m16">У данного пользователя отсутсвуют достижения</p> 
                    }
            </div>
        </AccountSectionBlock>
    )
})