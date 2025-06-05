import { FC, useContext, useEffect, useState } from 'react';
import { Form } from '@/components/form/Form';
import { Input } from '@/ui/input/Input';
import { SelectExercise } from '@/ui/SelectExercise/SelectExercise';
import { StoreContext } from '@/app/provider';
import { ExerciseFromLib } from '@/modules/TrainingConstructor/types/types';
import { observer } from 'mobx-react-lite';
import styles from './AddDoneExerciseForm.module.css';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import {ExerciseInHistory} from "../../types/types"
import { profileStore, trainingProcessStore } from '@/app/provider/StoreProvider';


export const AddDoneExerciseForm: FC = observer(() => {
  const { trainingHistoryStore } = useContext(StoreContext);
  const { trainingConstructorStore} = useContext(StoreContext)

  const [selectedExercise, setSelectedExercise] = useState<ExerciseFromLib | null>(null);
  const [weight, setWeight] = useState('');
  const [count, setCount] = useState('');
  const [rest, setRest] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    trainingConstructorStore.GetAllExercisesFromLib();
  }, []);

  const handleSubmit = async () => {
    if (selectedExercise != null) {
      const newEx: ExerciseInHistory = {
        name: selectedExercise.name,
        exercise_id: selectedExercise.id,
        image: '',
        process_video: "",
        approach: 
          {
            recommended_weight: -1,
            recommended_count: -1,
            in_progress_ex: {
              flag: true,
              done_weight: Number(weight),
              done_count: Number(count),
              diff_done_rec_w: -1,
              diff_done_rec_c: -1
            }
          }
      };
      await trainingProcessStore.SendDoneExercise(newEx);
      await trainingHistoryStore.GetHistory(String(profileStore.user.user_id));

      setSelectedExercise(null);
      setCount('');
      setWeight('');
      navigate(`/TrainingHistory`)
    }
  };

  return (
    <section className={styles['add-ex__container']}>
      <Form onSubmit={handleSubmit} className={styles['form']}>
        <SelectExercise
          allEx={trainingConstructorStore.all_ex_to_choose}
          value={selectedExercise}
          onChange={(exercise) => {
            setSelectedExercise(exercise);
            console.log('Выбрано упражнение:', exercise);
          }}
        />
        <Input
          placeholder="Вес"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          placeholder="Количество повторений"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <Input
          placeholder="Отдых после упражнения"
          value={rest}
          onChange={(e) => setRest(e.target.value)}
        />
        <BlueButton />
      </Form>
    </section>
  );
});
