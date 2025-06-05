import { StoreContext } from '@/app/provider';
import { Input } from '@/ui/input/Input';
import { FC, useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import styles from './TrainingDayEdit.module.css';
import { TrainingProgram } from '@/modules/TrainingConstructor/types/types';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';
import { RedDeleteButton } from '@/ui/buttons/RedDeleteButton/RedDeleteButton';
import { SaveModal } from '@/components/saveModal/SaveModal';
import { DeleteModal } from '@/components/deleteModal/DeleteModal';

interface TrainingDayEditProps {
  index: number;
}

export const TrainingDayEdit: FC<TrainingDayEditProps> = ({ index }) => {
  const { trainingConstructorStore } = useContext(StoreContext);
  const [name, setName] = useState(
    trainingConstructorStore.current_training.training_days[index].name,
  );
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const UpdatedData: TrainingProgram = {
      ...trainingConstructorStore.current_training,
      training_days: trainingConstructorStore.current_training.training_days.map((day, ind) =>
        ind === index
          ? {
            ...day,
            name: name,
          }
          : day,
      ),
    };
    await trainingConstructorStore.UpdateTrainingProgram(UpdatedData);
    await trainingConstructorStore.GetTrainingProgram(
      String(trainingConstructorStore.current_training.training_id),
    );
    navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${index}`);
  };

  const deleteDay = async () => {
    const UpdatedData: TrainingProgram = {
      ...trainingConstructorStore.current_training,
      training_days: trainingConstructorStore.current_training.training_days.filter(
        (_, ind) => ind != index,
      ),
    };
    await trainingConstructorStore.UpdateTrainingProgram(UpdatedData);
    navigate(`/ProgramPage/${trainingConstructorStore.current_training.training_id}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className={styles['day-edit__form']}>
        <BasicHeader onClick={() => setIsOpenSaveModal(true)} />
        <SaveModal
          isOpen={isOpenSaveModal}
          onClose={() => navigate(`/ProgramDayPage/${trainingConstructorStore.current_training.training_id}/${index}`)}
          onConfirm={handleSubmit}
          onCansel={() => setIsOpenSaveModal(false)}
        />
        <DeleteModal
          text='Удалить день?'
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onConfirm={deleteDay}
          onCansel={() => setIsOpenDeleteModal(false)}
        />
        <h2 className="m24bold">Редактирование тренировочного дня</h2>
        <div className={styles["inputs__container"]}>
          <label className='m16'>Название тренировочного дня</label>
          <Input
            className='m16'
            placeholder="Название тренировочного дня"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles["day-edit__buttons"]}>
          <BlueButton />
          <RedDeleteButton onClick={() => setIsOpenDeleteModal(true)} />
        </div>
      </Form>
    </>
  );
};
