import { FC, useContext, useEffect, useState } from "react";
import styles from './AnthropometryStatisticsPage.module.css';
import { BasicHeader } from "@/components/basicHeader/BasicHeader";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "@/app/provider";
import { AnthropometryStatisticsHeader } from "@/modules/Statistics/AnthropometryStatistics/components/AnthropometryStatisticsHeader/AnthropometryStatisticsHeader";
import { SelectAnthropometry } from "@/modules/Statistics/AnthropometryStatistics/components/SelectAnthropometry/SelectAnthropometry";
import { AnthFilter, BodyMeasurementType } from "@/modules/Statistics/AnthropometryStatistics/types/types";
import { StatisticsAnthGraph } from "@/modules/Statistics/AnthropometryStatistics/components/StatisticsAnthGraph/StatisticsAnthGraph";
import { PlusAddButtonWithText } from "@/ui/buttons/PlusAddButtonWithText/PlusAddButtonWithText";

export const AnthropometryStatisticsPage: FC = () => {
    const { id_user } = useParams();
    const { authStore, anthropometryStatisticsStore } = useContext(StoreContext);
    const [selectedAnth, setSelectedAnth] = useState<BodyMeasurementType | null>(null);
    const isOwner = (Number(id_user) === Number(authStore?.user?.user_id));
    const navigate = useNavigate();

    useEffect(() => {
        const AnthFilter: AnthFilter = {
            start_date: "2025-02-12 16:59:18",
            end_date: "2026-02-12 16:59:18"
        }
        const fetch = async () => {
            {
                isOwner ?
                    await anthropometryStatisticsStore.getAnthStatistics(AnthFilter, Number(authStore.user.user_id))
                    :
                    await anthropometryStatisticsStore.getAnthStatistics(AnthFilter, Number(id_user))
            }

        }
        fetch();
    }, [])
    return (
        <section className={styles["anth-stat__container"]}>
            <BasicHeader onClick={() => navigate(`/AccountPage/${id_user}`)} />
            <AnthropometryStatisticsHeader />
            <SelectAnthropometry onChange={setSelectedAnth} />
            {selectedAnth ?
                <StatisticsAnthGraph measurementType={selectedAnth} data={anthropometryStatisticsStore.anth_stat} />
                :
                <></>
            }
            {isOwner && <PlusAddButtonWithText text="Добавить замер" link="/ChangeAnthropometryData" />}
        </section>
    )
}