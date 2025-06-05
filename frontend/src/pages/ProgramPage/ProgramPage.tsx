import { FC, useContext, useEffect } from "react";
import styles from './ProgramPage.module.css';
import { StoreContext } from "@/app/provider";
import { useParams } from "react-router-dom";
import { TrainingProgramDescription } from "@/modules/TrainingConstructor/components/TrainingPrograms/TrainingProgramInfo/TrainingProgramDescription/TrainingProgramDescription";
import { TrainingDayList } from "@/modules/TrainingConstructor/components/TrainingPrograms/TrainingProgramInfo/TrainingDaysList/TrainingDayList";
import { observer } from "mobx-react-lite";
import { PlusAddButtonWithText } from "@/ui/buttons/PlusAddButtonWithText/PlusAddButtonWithText";

export const ProgramPage: FC = observer(() => {
    const { authStore, trainingConstructorStore } = useContext(StoreContext);
    const { id_tr } = useParams();

    useEffect(() => {
        const fetch = async () => {
            await trainingConstructorStore.GetTrainingProgram(id_tr);
        }
        fetch();
    }, [])

    const program = trainingConstructorStore.current_training;

    if (!program) {
        return (
            <p>Программа не найдена</p>
        )
    }

    const isOwner = program.author?.user_id === Number(authStore.user?.user_id)
    return (
        <div className={styles["program"]}>
            <div className={styles["program__head"]}>
                <TrainingProgramDescription program={program} />
            </div>
            <div className={styles["program-days__info"]}>
                <h2 className="m20med">Тренировочные дни</h2>
                {isOwner ? <PlusAddButtonWithText link='/CreateNewDay' text="Добавить тренировочный день" /> : <></>}
                {program.training_days?.length > 0 ? (
                    <TrainingDayList training_program={program} />
                ) : (
                    <p className={`${styles["no_days"]} m16`}>Нет тренировочных дней</p>
                )}
            </div>
        </div>
    )
})