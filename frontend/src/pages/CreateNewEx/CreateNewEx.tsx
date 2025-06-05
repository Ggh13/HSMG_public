import { AddNewEx } from "@/modules/TrainingConstructor/components/Exercises/AddNewEx/AddNewEx";
import { FC, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './CreateNewEx.module.css';
import { BasicHeader } from "@/components/basicHeader/BasicHeader";
import { StoreContext } from "@/app/provider";

export const CreateNewEx: FC = () => {
    const {trainingConstructorStore} = useContext(StoreContext);
    const { day_index } = useParams();
    const navigate = useNavigate();
    return (
        <section className={styles["add-ex__container"]}>
            <BasicHeader onClick={() => navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${day_index}`)} />
            <AddNewEx day_index={Number(day_index)} />
        </section>
    )
}