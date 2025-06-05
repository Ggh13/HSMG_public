import { StoreContext } from "@/app/provider"
import { ExercisesInDayList } from "@/modules/TrainingConstructor/components/TrainingDays/ExercisesInDayList/ExercisesInDayList";
import { TrainingDayInfo } from "@/modules/TrainingConstructor/components/TrainingDays/TrainingDayInfo/TrainingDayInfo"
import { FC, useContext} from "react"
import { useParams } from "react-router-dom";
import styles from './ProgramDayPage.module.css';
import { observer } from "mobx-react-lite";
import { PlusAddButtonWithText } from "@/ui/buttons/PlusAddButtonWithText/PlusAddButtonWithText";
import { Loader } from "@/ui/loader/Loader";


export const ProgramDayPage: FC = observer(() => {
    const { trainingConstructorStore } = useContext(StoreContext);
    const { day_ind, id_tr } = useParams();

    if(trainingConstructorStore.loading){
        return (
            <Loader/>
        )
    }

    const currentDay = trainingConstructorStore.current_training.training_days[Number(day_ind)];
    
    return (
        <div className={styles["day__container"]}>
            <TrainingDayInfo training_day={currentDay} index={Number(day_ind)} id_tr={Number(id_tr)} />
            <div className={styles["ex-in-day__container"]}>
                <h2 className="m20med">Упражнения</h2>
                <PlusAddButtonWithText text="Добавить новое упражнение" link={`/CreateNewEx/${day_ind}`} />
                <ExercisesInDayList exercises={currentDay.exercises} day_ind={Number(day_ind)} />
            </div>
        </div>
    )
})