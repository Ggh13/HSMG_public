import { StoreContext } from "@/app/provider";
import { Form } from "@/components/form/Form";
import { ExerciseFromLib, TrainingProgram, Approach } from "@/modules/TrainingConstructor/types/types";
import { Input } from "@/ui/input/Input";
import { SelectExercise } from "@/ui/SelectExercise/SelectExercise";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ExerciseEdit.module.css';
import { BlueButton } from "@/ui/buttons/BlueButton/BlueButton";
import { RedDeleteButton } from "@/ui/buttons/RedDeleteButton/RedDeleteButton";
import { BasicHeader } from "@/components/basicHeader/BasicHeader";
import { SaveModal } from "@/components/saveModal/SaveModal";
import { DeleteModal } from "@/components/deleteModal/DeleteModal";
import { observer } from "mobx-react-lite";
import { AddApproachForm } from "../AddApproachForm/AddApproachForm"; // Используем тот же компонент, что и в AddOneExerciseForm
import { PlusAddButtonWithText } from "@/ui/buttons/PlusAddButtonWithText/PlusAddButtonWithText";

interface ExerciseEditProps {
    index_day: number;
    index_ex: number;
}

export const ExerciseEdit: FC<ExerciseEditProps> = observer(({ index_day, index_ex }) => {
    const { trainingConstructorStore } = useContext(StoreContext);
    const exercise_to_edit = trainingConstructorStore.current_training?.training_days[index_day].exercises[index_ex];

    const [selectedExercise, setSelectedExercise] = useState<ExerciseFromLib | null>(null);
    const [link, setLink] = useState(exercise_to_edit?.example_exercise);
    const [approaches, setApproaches] = useState<Approach[]>(exercise_to_edit?.approaches);
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        trainingConstructorStore.GetAllExercisesFromLib();
        // Устанавливаем выбранное упражнение при загрузке
        const currentEx = trainingConstructorStore.all_ex_to_choose.find(
            ex => ex.id === exercise_to_edit.exercise_id
        );
        if (currentEx) setSelectedExercise(currentEx);
    }, []);

    const deleteEx = async () => {
        const updatedData = {
            ...trainingConstructorStore.current_training,
            training_days: trainingConstructorStore.current_training.training_days.map((day, index) =>
                index === index_day
                    ? {
                        ...day,
                        exercises: day.exercises.filter((_, i) => i !== index_ex),
                    }
                    : day,
            ),
        };
        await trainingConstructorStore.UpdateTrainingProgram(updatedData);
        navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${index_day}`);
    };

    const handleSubmit = async () => {
        const updatedData: TrainingProgram = {
            ...trainingConstructorStore.current_training,
            training_days: trainingConstructorStore.current_training.training_days.map((day, ind_day) =>
                ind_day === index_day
                    ? {
                        ...day,
                        exercises: day.exercises.map((ex, ind_ex) =>
                            ind_ex === index_ex
                                ? {
                                    ...ex,
                                    name: selectedExercise?.name || ex.name,
                                    exercise_id: selectedExercise?.id || ex.exercise_id,
                                    example_exercise: link,
                                    approaches: approaches
                                }
                                : ex
                        )
                    }
                    : day
            )
        };
        await trainingConstructorStore.UpdateTrainingProgram(updatedData);
        navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${index_day}`)
    };

    const addEmptyApproach = () => {
        setApproaches([
            ...approaches,
            {
                recommended_weight: 0,
                recommended_count: 0,
                in_progress_ex: {
                    flag: false,
                    done_weight: -1,
                    done_count: -1,
                    diff_done_rec_w: -1,
                    diff_done_rec_c: -1
                }
            }
        ]);
    };

    const updateApproach = (index: number, weight: number, count: number) => {
        const updatedApproaches = approaches.map((approach, i) =>
            i === index
                ? {
                    ...approach,
                    recommended_weight: weight,
                    recommended_count: count
                }
                : approach
        );
        setApproaches(updatedApproaches);
    };

    const removeApproach = (indexToRemove: number) => {
        setApproaches(prevApproaches =>
            prevApproaches.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className={styles["form"]}>
                <BasicHeader onClick={() => setIsOpenSaveModal(true)} />

                <SaveModal
                    isOpen={isOpenSaveModal}
                    onConfirm={handleSubmit}
                    onCansel={() => setIsOpenSaveModal(false)}
                    onClose={() => navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${index_day}`)}
                />

                <DeleteModal
                    text="Удалить упражнение?"
                    isOpen={isOpenDeleteModal}
                    onConfirm={deleteEx}
                    onCansel={() => setIsOpenDeleteModal(false)}
                    onClose={() => setIsOpenDeleteModal(false)}
                />

                <h2 className="m20med">Редактирование упражнения</h2>

                <SelectExercise
                    allEx={trainingConstructorStore.all_ex_to_choose}
                    value={selectedExercise}
                    onChange={setSelectedExercise}
                />

                <Input
                    placeholder="Ссылка с техникой выполнения упражнения"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />

                <div className={styles["approaches-container"]}>
                    {approaches.map((approach, index) => (
                        <div key={index} className={styles["approach-wrapper"]}>
                            <AddApproachForm
                                key={`approach-${index}-${approach.recommended_weight}-${approach.recommended_count}`}
                                index={index}
                                approach={approach}
                                onUpdate={updateApproach}
                                onDelete={removeApproach}
                            />
                        </div>
                    ))}
                </div>

                <PlusAddButtonWithText
                    text="Добавить подход"
                    onClick={addEmptyApproach}
                />


            </Form>
            <div className={styles["ex-edit__buttons"]}>
                <BlueButton onClick={() => setIsOpenSaveModal(true)} />
                <RedDeleteButton onClick={() => setIsOpenDeleteModal(true)} />
            </div>
        </>
    );
});