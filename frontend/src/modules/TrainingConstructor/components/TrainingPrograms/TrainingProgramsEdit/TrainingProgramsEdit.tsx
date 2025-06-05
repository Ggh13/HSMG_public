import { FC, useState, useContext } from 'react';
import { Form } from '@/components/form/Form';
import { InputAvatar } from '@/ui/InputAvatar/InputAvatar';
import { Input } from '@/ui/input/Input';
import styles from './TrainingProgramsEdit.module.css';
import { StoreContext } from '@/app/provider';
import { useNavigate } from 'react-router-dom';
import { TrainingProgram } from '@/modules/TrainingConstructor/types/types';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';
import { RedDeleteButton } from '@/ui/buttons/RedDeleteButton/RedDeleteButton';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';
import { SaveModal } from '@/components/saveModal/SaveModal';
import { DeleteModal } from '@/components/deleteModal/DeleteModal';

export const TrainingProgramsEdit: FC = () => {
  const { trainingConstructorStore, authStore } = useContext(StoreContext);
  const [img, setImg] = useState(trainingConstructorStore.current_training.image);
  const [name, setName] = useState(trainingConstructorStore.current_training.name);
  const [description, setDescription] = useState(
    trainingConstructorStore.current_training.description,
  );
  const [type, setType] = useState(trainingConstructorStore.current_training.type);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const UpdatedProgram: TrainingProgram = {
      ...trainingConstructorStore.current_training,
      image: img,
      name: name,
      description: description,
      type: type,
    };
    await trainingConstructorStore.UpdateTrainingProgram(UpdatedProgram);
    navigate(`/UserTrainingPrograms/${authStore.user.user_id}`);
  };

  const deleteProgram = async () => {
    const ProgramToDelete: TrainingProgram = {
      ...trainingConstructorStore.current_training,
      flag: -1,
    };
    await trainingConstructorStore.UpdateTrainingProgram(ProgramToDelete);
    navigate(`/UserTrainingPrograms/${authStore.user.user_id}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <BasicHeader onClick={() => setIsOpenSaveModal(true)} />
        <SaveModal
          isOpen={isOpenSaveModal}
          onConfirm={handleSubmit}
          onClose={() => navigate(`/ProgramPage/${trainingConstructorStore.current_training.training_id}`)}
          onCansel={() => setIsOpenSaveModal(false)}
        />
        <DeleteModal
          text='Удалить программу?'
          isOpen={isOpenDeleteModal}
          onConfirm={deleteProgram}
          onCansel={() => setIsOpenDeleteModal(false)}
          onClose={() => setIsOpenDeleteModal(false)}
        />
        <h2 className="m20">Редактирование программы тренировок</h2>
        <InputAvatar
          label="Изменить фото"
          initialImage={img}
          onChange={(base64) => setImg(base64)}
        />
        <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea
          className={`${styles['program__textarea']} m16`}
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={150}
        />
        <select className={styles['select__element']} onChange={(e) => setType(e.target.value)}>
          <option value="">Выберите вид тренировки</option>
          <option value="Bodybuilding">Силовая тренировка</option>
          <option value="Cardio">Кардио</option>
          <option value="Yoga">Йога</option>
          <option value="Pilates">Пилатес</option>
        </select>
        <div className={styles["program-edit__buttons"]}>
          <BlueButton />
          <RedDeleteButton onClick={() => setIsOpenDeleteModal(true)} />
        </div>
      </Form>
    </>
  );
};
