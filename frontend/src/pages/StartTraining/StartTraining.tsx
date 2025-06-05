import { FC, useEffect, useState } from 'react';
import styles from './StartTraining.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { trainingProcessStore } from '@/app/provider/StoreProvider';
import { Loader } from '@/ui/loader/Loader';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';
import { observer } from 'mobx-react-lite';
import { Exercise } from '@/modules/TrainingProcess/types/types';
import { Modal } from '@/ui/Modals/Modal';
import fakeVideo from '@/ui/imgs/fake_video.svg';
import info from '@/ui/imgs/info.svg';
import start from '@/ui/imgs/start.svg'
import time from "@/ui/imgs/time.svg";
import energy from "@/ui/imgs/energy.svg";
export const StartTraining: FC = observer(() => {
  const navigate = useNavigate();
  const { program_id } = useParams();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!program_id) return;
    trainingProcessStore.GetUserProgram(program_id);
  }, [program_id]);
  const firstIncompleteDayIndex = trainingProcessStore.program.training_days.findIndex(
    (day) => !day.flag,
  );
  const day = trainingProcessStore.program.training_days[firstIncompleteDayIndex];


  const openModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  if (trainingProcessStore.loading) {
    return <Loader />;
  }

  return (
    <div className={styles['day__container']}>
      {isModalOpen && selectedExercise && (
        <Modal onClose={closeModal}>
          <div className={`${styles['exercise-modal']}`}>
            <img src={fakeVideo} alt="Видео" />
            <h2 className="m24bold">{selectedExercise.name}</h2>
            <p className="m16">
              Рекомендуемый вес: {selectedExercise.approaches[0]?.recommended_weight} кг
            </p>
            <div className={styles['info-row']}>
              <div>
                <span className={`m20 ${styles['label']}`}>ПОВТОРЫ</span>
                <p className={`m16bold ${styles['value-blue']}`}>
                  {selectedExercise.approaches[0]?.recommended_count} раз
                </p>
              </div>
              <div>
                <span className={`m20 ${styles['label']}`}>ОТДЫХ</span>
                <p className={`m16bold ${styles['value-green']}`}>2 минуты</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <main className={styles['day__main']}>
        <div className={styles['day__header']}>
          <BasicHeader />
        </div>

        {firstIncompleteDayIndex !== -1 ? (
          <div className={styles['day__main']}>
            <h1 className={`m24bold ${styles['day__name']}`}>{day.name}</h1>
            <button onClick={() => navigate(`/TrainingProcess/${program_id}`)} className={`m16bold ${styles['day__start']}`}>
              <img src={start} alt="Начать" />
              Начать
            </button>
            <div className={styles["day__info"]}>
              <div className={styles["day__time"]}>
                <img src={time} alt="Время" />
                <span className={`m14 ${styles["day__time-text"]}`}>1 час</span>
              </div>
              <div className={styles["day__energy"]}>
                <img src={energy} alt="Каллории" />
                <span className={`m14 ${styles["day__energy-text"]}`}>400 ккал</span>
              </div>
            </div>
            <h2 className={`m20bold ${styles['day__exercises-title']}`}>Упражнения</h2>
            <ul className={styles['current-programs__list']}>
              {day.exercises.map((ex) => (
                <li className={`m16 ${styles['day__exercise']}`} key={ex.exercise_id}>
                  - {ex.name}{' '}
                  <button className={styles['info__button']} onClick={() => openModal(ex)}>
                    <img src={info} alt="Информация" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1 className="m24bold">Все дни завершены 🎉</h1>
        )}
      </main>
    </div>
  );
});
