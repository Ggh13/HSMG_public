import { StoreContext } from "@/app/provider";
import { Form } from "@/components/form/Form";
import { SelectAchieve } from "@/ui/SelectAchieve/SelectAchieve";
import { FC, useContext, useEffect, useState } from "react";
import { Achievement, BestExercise } from "../../types/types";
import styles from './AddAchieveForm.module.css';
import { Input } from "@/ui/input/Input";
import { SaveHeader } from "@/components/saveHeader/SaveHeader";
import addAchieve from '@/ui/imgs/addAchieve.svg';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";


export const AddAchieveForm: FC = observer(() => {
    const { achievementsStore } = useContext(StoreContext);
    const [selectedExercise, setSelectedExercise] = useState<BestExercise | null>(null);
    const [videoUrl, setVideoUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        achievementsStore.getPossibleAchieve();
    }, [])

    const handleSubmit = async () => {
        const newAchieve: Achievement = {
            id: -1,
            exercise_id: Number(selectedExercise?.exercise_id),
            name_exercise: String(selectedExercise?.name_exercise),
            image: "",
            weight: Number(selectedExercise?.done_weight),
            count: Number(selectedExercise?.done_count),
            date: selectedExercise?.date,
            record_video: ""
        }
        await achievementsStore.addAchieve(newAchieve);
        navigate('/AchievementsPage')
    }
    return (
        <Form
            className={styles["add-achieve__form"]}
            onSubmit={handleSubmit}>
            <SaveHeader />
            <h2 className="m24med">Добавьте новое достижение</h2>
            <p className="m14">Вы можете поделиться своим достижением. Его будет видно всем, кто заходит в твой профиль.</p>
            <div className={styles["add-achieve__container"]}>
                <img src={addAchieve} className={styles["background__image"]} />
                <div className={styles["add-achieve__content"]}>
                    <SelectAchieve allEx={achievementsStore.possible_achieve} value={selectedExercise} onChange={setSelectedExercise} />
                    <Input placeholder="Добавьте ссылку на видео с достижением" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                </div>
            </div>
        </Form>
    )
})