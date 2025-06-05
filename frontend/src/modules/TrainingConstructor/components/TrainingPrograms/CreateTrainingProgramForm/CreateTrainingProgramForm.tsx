import { Form } from '@/components/form/Form';
import { Input } from '@/ui/input/Input';
import { InputAvatar } from '@/ui/InputAvatar/InputAvatar';
import { StoreContext } from '@/app/provider';
import { FC, useContext, useState } from 'react';
import { TrainingProgram } from '@/modules/TrainingConstructor/types/types';
import styles from './CreateTrainingProgramForm.module.css';
import { useNavigate } from 'react-router-dom';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';

export const CreateTrainingProgramForm: FC = () => {
  const { trainingConstructorStore, authStore } = useContext(StoreContext);
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newProgram: TrainingProgram = {
      training_id: -1,
      version: 0,
      name: name,
      description: description,
      image: img,
      price: 0,
      flag: 1,
      type: type,
      author: authStore.user,
      training_days: [],
    };
    await trainingConstructorStore.CreateTrainingProgram(newProgram);
    await trainingConstructorStore.fetchUserTrainingPrograms();
    navigate(`/ProgramPage/${trainingConstructorStore?.user_trainings[trainingConstructorStore?.user_trainings.length - 1]?.training_id}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <BasicHeader />
      <h2 className='m24bold'>Создайте программу тренировок</h2>
      <InputAvatar label="добавить фото" initialImage={img} onChange={(base64) => setImg(base64)} />
      <Input className="m16" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea
        className={`${styles['program__textarea']} m16`}
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={150}
        required
      />
      <select
        className={`${styles['select__element']} m16`}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="">Выберите вид тренировки</option>
        <option value="Bodybuilding">Силовая тренировка</option>
        <option value="Cardio">Кардио</option>
        <option value="Yoga">Йога</option>
        <option value="Pilates">Пилатес</option>
      </select>
      <BlueButton />
    </Form>
  );
};
