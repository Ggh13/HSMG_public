import { FC, useContext } from "react";
import styles from './TrainingMenu.module.css'
import { MenuItem } from "@/ui/menuItem/MenuItem";
import fav from '@/ui/imgs/added_fav_blue.svg'
import muscle from '@/ui/imgs/muscle.svg';
import target from '@/ui/imgs/targer.svg';
import constr from '@/ui/imgs/constructor.svg';
import { StoreContext } from "@/app/provider";
import { BasicHeader } from "@/components/basicHeader/BasicHeader";
import { useNavigate } from "react-router-dom";

export const TrainingMenu: FC = () => {
    const { authStore } = useContext(StoreContext);
    const navigate = useNavigate();
    return (
        <section className={styles["training-menu__container"]}>
            <BasicHeader onClick={() => navigate(`/AccountPage/${authStore.user.user_id}`)} />
            <h2 className="m24med">Тренировочная</h2>
            <MenuItem src={fav} title="Избранное" text="твои избранные программы" link="/FavoritePrograms" />
            <MenuItem src={muscle} title="Мои программы" text="то, что ты тренируешь сейчас" link="/CurrentPrograms" />
            <MenuItem src={target} title="История тренировок" text="твои завершенные тренировки" link="/TrainingHistory" />
            
            <MenuItem src={constr} title="Конструктор тренировок" text="создай свою авторскую тренировку" link={`/UserTrainingPrograms/${authStore.user.user_id}`} />
        </section>
    )
}