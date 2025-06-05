import { StoreContext } from '@/app/provider';
import { Form } from '@/components/form/Form';
import { Input } from '@/ui/input/Input';
import { FC, useContext, useState } from 'react';
import styles from './CreateTrainingDayForm.module.css';
import { observer } from 'mobx-react-lite';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';

export const CreateTrainingDayForm: FC = observer(() => {
  const { trainingConstructorStore } = useContext(StoreContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const updatedProgram = {
      ...trainingConstructorStore.current_training,
      training_days: [
        ...trainingConstructorStore.current_training.training_days,
        {
          name: name,
          description: description,
          image: '',
          week_day: '',
          exercises: [],
        },
      ],
    };
    await trainingConstructorStore.UpdateTrainingProgram(updatedProgram);
    await trainingConstructorStore.GetTrainingProgram(
      String(trainingConstructorStore.current_training.training_id),
    );
    setName('');
    setDescription('');
    navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${trainingConstructorStore.current_training.training_days.length - 1}`)
  };
  return (
    <Form onSubmit={handleSubmit} className={styles['form']}>
      <BasicHeader onClick={() => navigate(`/ProgramPage/${trainingConstructorStore.current_training.training_id}`)} />
      <h2 className="m24bold">Создание тренировочного дня</h2>
      <Input
        placeholder="Название тренировочного дня"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <BlueButton />
    </Form>
  );
});
