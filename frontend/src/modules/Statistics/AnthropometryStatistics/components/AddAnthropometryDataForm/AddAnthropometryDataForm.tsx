import { FC, useContext, useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Anthropometry } from "../../types/types";
import { StoreContext } from "@/app/provider";
import { Input } from "@/ui/input/Input";
import styles from './AddAnthropometryDataForm.module.css';
import { observer } from "mobx-react-lite";
import { SaveHeader } from "@/components/saveHeader/SaveHeader";

const measurementLabels = {
    height: "Рост (см)",
    weight: "Вес (кг)",
    neck_girth: "Обхват шеи (см)",
    shoulder_girth: "Обхват плеч (см)",
    chest_girth: "Обхват груди (см)",
    waist_girth: "Обхват талии (см)",
    biceps_girth: "Обхват бицепса (см)",
    forearms_girth: "Обхват предплечья (см)",
    hip_girth: "Обхват бедра (см)",
    quadriceps_girth: "Обхват квадрицепса (см)",
    calf_girth: "Обхват икры (см)",
    wrist_girth: "Обхват запястья (см)",
    ankle_girth: "Обхват лодыжки (см)"
} as const;

export const AddAnthropometryDataForm: FC = observer(() => {
    const { authStore, anthropometryStatisticsStore, errorstore } = useContext(StoreContext);
    const navigate = useNavigate();

    // Инициализация формы данными из хранилища
    const initialFormData = () => ({
        height: anthropometryStatisticsStore.current_anth?.height ?? undefined,
        weight: anthropometryStatisticsStore.current_anth?.weight ?? undefined,
        neck_girth: anthropometryStatisticsStore.current_anth?.neck_girth ?? undefined,
        shoulder_girth: anthropometryStatisticsStore.current_anth?.shoulder_girth ?? undefined,
        chest_girth: anthropometryStatisticsStore.current_anth?.chest_girth ?? undefined,
        waist_girth: anthropometryStatisticsStore.current_anth?.waist_girth ?? undefined,
        biceps_girth: anthropometryStatisticsStore.current_anth?.biceps_girth ?? undefined,
        forearms_girth: anthropometryStatisticsStore.current_anth?.forearms_girth ?? undefined,
        hip_girth: anthropometryStatisticsStore.current_anth?.hip_girth ?? undefined,
        quadriceps_girth: anthropometryStatisticsStore.current_anth?.quadriceps_girth ?? undefined,
        calf_girth: anthropometryStatisticsStore.current_anth?.calf_girth ?? undefined,
        wrist_girth: anthropometryStatisticsStore.current_anth?.wrist_girth ?? undefined,
        ankle_girth: anthropometryStatisticsStore.current_anth?.ankle_girth ?? undefined,
    });

    const [formData, setFormData] = useState(initialFormData);
    const isLoading = anthropometryStatisticsStore.loading;
    const error = errorstore.error;

    useEffect(() => {
        setFormData(initialFormData());
    }, [anthropometryStatisticsStore.current_anth]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: Number(value) || undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!authStore.user || isLoading) return;

        const anthData: Anthropometry = {
            ...formData,
            id: -1,
            user_id: Number(authStore.user.user_id),
            date: new Date().toISOString()
        };

        await anthropometryStatisticsStore.setUserAnth(anthData);
        if (!errorstore.error) navigate(`/AnthropometryStatisticsPage/${authStore?.user?.user_id}`);
    };

    const handleDelete = async () => {
        if (isLoading) return;
        await anthropometryStatisticsStore.deleteUserAnth();
        if (!errorstore.error) navigate(`/AnthropometryStatisticsPage/${authStore?.user?.user_id}`);
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.anth__form}>
            <SaveHeader />
            <header className={styles["anth-form__header"]}>
                <h2 className="m24med">Добавьте новые замеры</h2>
                <p className="m14">Перед замерами рекомендуем запампиться и просмотреть видео о том как правильно производить замеры тела</p>
            </header>

            {error && <p className={`${styles["anth-form__error"]} m16`}>{error}</p>}

            <div className={styles["anth-inputs__container"]}>
                {Object.entries(formData).map(([field, value]) => (
                    <div className={styles["form__input"]}>
                        <label className="m16">{measurementLabels[field as keyof typeof measurementLabels]}</label>
                        <Input
                            key={field}
                            placeholder="Введите значение"
                            name={field}
                            type="number"
                            value={value ?? ""}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                ))}
            </div>

            <div className={styles["anth-form__buttons"]}>
                <p className="m14">
                    Вы можете <button className={`${styles["form__delete_button"]} m14`} onClick={handleDelete}>удалить</button> предыдущие замеры
                </p>
            </div>
        </Form>
    );
});