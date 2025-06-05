import { Input } from '@/ui/input/Input';
import { Approach } from '@/modules/TrainingHistory/types';
import { FC, useEffect, useState } from 'react';
import styles from './AddApproachForm.module.css';

interface AddApproachFormProps {
    index: number;
    approach: Approach;
    onUpdate: (index: number, weight: number, count: number) => void;
    onDelete?: (index: number) => void;
}

export const AddApproachForm: FC<AddApproachFormProps> = ({ index, approach, onUpdate, onDelete }) => {
    const [weight, setWeight] = useState(approach.recommended_weight.toString());
    const [count, setCount] = useState(approach.recommended_count.toString());

    useEffect(() => {
        onUpdate(index, Number(weight), Number(count));
    }, [weight, count]);

     const handleDelete = () => {
        if (onDelete) {
            onDelete(index); // Явно передаем текущий индекс
        }
    };


    return (
        <div className={styles["approach__form"]}>
            <header className={styles["approach-form__header"]}>
                <p className="m16">Подход №{index + 1}</p>
                {onDelete && <p onClick={handleDelete} className={`${styles["approach-delete__button"]} m16`}>Удалить подход</p>}
            </header>
            <Input
                placeholder="Укажите рекомендуемый вес"
                type="number"
                value={weight != "0" ? weight : ""}
                onChange={(e) => setWeight(e.target.value)}
            />
            <Input
                placeholder="Количество повторений"
                type="number"
                value={count != "0" ? count : ""}
                onChange={(e) => setCount(e.target.value)}
            />
        </div>
    );
};