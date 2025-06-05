import { AddAnthropometryDataForm } from "@/modules/Statistics/AnthropometryStatistics/components/AddAnthropometryDataForm/AddAnthropometryDataForm";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect } from "react";
import styles from './ChangeAnthropometryData.module.css';
import { StoreContext } from "@/app/provider";

export const ChangeAnthropometryData: FC = observer(() => {
    const { authStore, anthropometryStatisticsStore } = useContext(StoreContext);

    useEffect(() => {
        anthropometryStatisticsStore.getUserAnth(Number(authStore.user.user_id));
    }, [])
    return (
        <section className={styles["anth-form__container"]}>
            <AddAnthropometryDataForm />
        </section>
    )
})