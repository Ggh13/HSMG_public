import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { trainingProcessStore } from '@/app/provider/StoreProvider';
import { Loader } from '@/ui/loader/Loader';
import { ProcessHeader } from '@/components/processHeader/ProcessHeader';
import { ExerciseInputModal } from '@/modules/TrainingProcess/components/ExerciseInputModal/ExerciseInputModal';
import styles from './TrainingProcess.module.css';
import fakeVideo from '@/ui/imgs/fake_video.svg';

export const TrainingProcess: FC = observer(() => {
  const { program_id } = useParams();
  const navigate = useNavigate();
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showInputModal, setShowInputModal] = useState(false);
  const [customReps, setCustomReps] = useState<number | null>(null);
  const [customWeight, setCustomWeight] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (program_id) {
      trainingProcessStore.GetUserProgram(program_id);
    }
  }, [program_id]);
  useEffect(() => {
    if (isFinished) {
      navigate(`/EndTraining/${program_id}`);
    }
  }, [isFinished, navigate, program_id]);
  
  if (
    trainingProcessStore.loading ||
    !trainingProcessStore.program.training_days?.length
  ) {
    return <Loader />;
  }
  
  const firstIncompleteDayIndex = trainingProcessStore.program.training_days.findIndex(
    (day) => !day.flag,
  );
  

  const exercises = trainingProcessStore.program.training_days[firstIncompleteDayIndex]?.exercises;
  
  if (!exercises || !exercises.length) {
    return <div>В этом дне нет упражнений</div>;
  }
  
  const exercise = exercises[exerciseIndex];
  const rec = exercise?.approaches?.[0];
  
  if (!exercise || !rec) {
    return <Loader />;
  }

  const handleSaveValues = (reps: number, weight: number) => {
    setCustomReps(reps);
    setCustomWeight(weight);
    setShowInputModal(false);
  };

  const handleDone = async () => {
    const inProgress = exercise.approaches[0].in_progress_ex;
    inProgress.flag = true;
    inProgress.done_weight = customWeight ?? rec.recommended_weight;
    inProgress.done_count = customReps ?? rec.recommended_count;
    inProgress.diff_done_rec_w = inProgress.done_weight - rec.recommended_weight;
    inProgress.diff_done_rec_c = inProgress.done_count - rec.recommended_count;
    exercise.flag = true;

    trainingProcessStore.addDoneExercise({
      name: exercise.name,
      exercise_id: exercise.exercise_id,
      image: exercise.image,
      process_video: exercise.example_exercise,
      flag: true,
      approach: {
        recommended_weight: rec.recommended_weight,
        recommended_count: rec.recommended_count,
        in_progress_ex: { ...inProgress },
      },
    });

    nextExerciseOrFinish();
  };

  const handleSkip = () => {
    nextExerciseOrFinish();
  };

  const nextExerciseOrFinish = async () => {
    const nextIndex = exerciseIndex + 1;
  
    if (nextIndex >= exercises.length) {
      const day = trainingProcessStore.program.training_days[firstIncompleteDayIndex];
      const hasCompleted = day.exercises.some((ex) => ex.flag);
  
      if (hasCompleted) {
        day.flag = true;
  
        for (const ex of trainingProcessStore.doneExercises) {
          await trainingProcessStore.SendDoneExercise(ex);
        }
  
        await trainingProcessStore.UpdateProgram(
          trainingProcessStore.program.training_id.toString(),
          trainingProcessStore.program,
        );
      }
  
      setIsFinished(true);
    } else {
      setExerciseIndex(nextIndex);
    }
  };
  


  if (trainingProcessStore.loading) return <Loader />;
  return (
    <main className={styles['process__container']}>
      <ProcessHeader />
      <div className={styles['process__container-info']}>
        <p className={`m16bold ${styles['process__progress']}`}>
          {exerciseIndex + 1} из {exercises.length}
        </p>
        <div className={styles['process__video']}>
          <img src={fakeVideo} alt="Видео" />
        </div>
        <h2 className={`m24bold ${styles['process__title']}`}>{exercise.name}</h2>
        <p className={`m16 ${styles['process__weight']}`}>
          Рекомендуемый вес: {rec.recommended_weight} кг
        </p>
        <a
          onClick={() => setShowInputModal(true)}
          className={`m14bold ${styles['process__set-results']}`}
        >
          Ввести свои значения
        </a>

        {showInputModal && (
          <ExerciseInputModal onClose={() => setShowInputModal(false)} onSave={handleSaveValues} />
        )}

        <div className={styles['process__info-blocks']}>
          <div>
            <p className={`m20 ${styles['process__info-label']}`}>ПОВТОРЫ</p>
            <p className={`m16bold ${styles['process__info-value-blue']}`}>
              {rec.recommended_count} раз
            </p>
          </div>
          <div>
            <p className={`m20 ${styles['process__info-label']}`}>ОТДЫХ</p>
            <p className={`m16bold ${styles['process__info-value-green']}`}>60 сек</p>
          </div>
        </div>

        <div className={styles['process__action-buttons']}>
          <button
            className={styles['process__skip-button']}
            onClick={() => setExerciseIndex(Math.max(0, exerciseIndex - 1))}
            disabled={exerciseIndex === 0}
          >
            Назад
          </button>
          <button className={styles['process__done-button']} onClick={handleDone}>
            Выполнено
          </button>
          <button className={styles['process__skip-button']} onClick={handleSkip}>
            Пропустить
          </button>
        </div>
      </div>
    </main>
  );
});
