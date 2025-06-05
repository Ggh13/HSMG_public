// AddOneExerciseForm.tsx
import { FC, useContext, useEffect, useState } from 'react';
import { Form } from '@/components/form/Form';
import { Input } from '@/ui/input/Input';
import { SelectExercise } from '@/ui/SelectExercise/SelectExercise';
import { StoreContext } from '@/app/provider';
import { Exercise, ExerciseFromLib, TrainingProgram } from '@/modules/TrainingConstructor/types/types';
import { observer } from 'mobx-react-lite';
import styles from './AddOneExerciseForm.module.css';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import { PlusAddButtonWithText } from '@/ui/buttons/PlusAddButtonWithText/PlusAddButtonWithText';
import { Approach } from '@/modules/TrainingHistory/types';
import { AddApproachForm } from '../AddApproachForm/AddApproachForm';

interface AddOneExerciseFormProps {
  day_ind: number;
}

export const AddOneExerciseForm: FC<AddOneExerciseFormProps> = observer(({ day_ind }) => {
  const { trainingConstructorStore } = useContext(StoreContext);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseFromLib | null>(null);
  const [link, setLink] = useState('');
  const [approaches, setApproaches] = useState<Approach[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    trainingConstructorStore.GetAllExercisesFromLib();
  }, []);

  const handleSubmit = async () => {
    if (!selectedExercise) return;

    const newExercise: Exercise = {
      name: selectedExercise.name,
      exercise_id: selectedExercise.id,
      description: '',
      image: '',
      example_exercise: link,
      approaches: approaches
    };

    const updatedProgram: TrainingProgram = {
      ...trainingConstructorStore.current_training,
      training_days: trainingConstructorStore.current_training.training_days.map((day, index) =>
        index === day_ind
          ? { ...day, exercises: [...(day.exercises || []), newExercise] }
          : day
      ),
    };

    await trainingConstructorStore.UpdateTrainingProgram(updatedProgram);
    await trainingConstructorStore.GetTrainingProgram(
      String(trainingConstructorStore.current_training.training_id),
    );
    navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${day_ind}`);
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

  return (
    <section className={styles['add-ex__container']}>
      <Form onSubmit={handleSubmit} className={styles['form']}>
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

        {approaches.map((approach, index) => (
          <AddApproachForm
            key={index}
            index={index}
            approach={approach}
            onUpdate={updateApproach}
          />
        ))}

        <PlusAddButtonWithText
          onClick={addEmptyApproach}
          text='Добавить подход'
        />

        <BlueButton />
      </Form>
    </section>
  );
});