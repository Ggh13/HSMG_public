import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainingProcessStore } from '@/app/provider/StoreProvider';
import { observer } from 'mobx-react-lite';
import styles from './EndTraining.module.css';
import { Loader } from '@/ui/loader/Loader';
import energy from '@/ui/imgs/energy.svg';
import time from '@/ui/imgs/time.svg';
import doneEx from '@/ui/imgs/doneEx.svg';
export const EndTraining: FC = observer(() => {
  const { program_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (program_id && trainingProcessStore.program.training_id !== Number(program_id)) {
      trainingProcessStore.GetUserProgram(program_id);
    }
  }, [program_id]);
  if (
    trainingProcessStore.loading ||
    !trainingProcessStore.program.training_days ||
    trainingProcessStore.program.training_days.length === 0
  ) {
    return <Loader />;
  }

  const program = trainingProcessStore.program;
  const firstIncompleteDayIndex = program.training_days.findIndex((day) => !day.flag);
  let lastCompletedDay = null;
  if (firstIncompleteDayIndex === -1) {
    lastCompletedDay = program.training_days.at(-1); // предыдущий, завершённый
  } else {
    lastCompletedDay = program.training_days[firstIncompleteDayIndex - 1]; // предыдущий, завершённый
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <span className={styles.emoji}>💪</span>
        <p className={`${styles.bannerText} m16`}>
          Тренировка окончена! Молодец, продолжай в том же духе!
        </p>
      </div>

      <h2 className={`${styles.dayTitle} m20bold`}>{lastCompletedDay?.name}</h2>

      <div className={styles.infoRow}>
        <span className="m12">
          <img src={time} alt="Время" /> 30 мин.
        </span>
        <span className="m12">
          <img src={energy} alt="Каллории" /> 200 ккал
        </span>
      </div>

      <h3 className={`${styles.exerciseTitle} m20bold`}>Упражнения</h3>
      <ul className={styles.exerciseList}>
        {lastCompletedDay?.exercises.map((ex) => (
          <li className={`${styles.exerciseItem} m16`} key={ex.exercise_id}>
            {ex.name}
            {ex.flag && <img src={doneEx} alt="" />}
          </li>
        ))}
      </ul>

      <button className={styles.button} onClick={() => navigate(`/CurrentProgram/${program_id}`)}>
        На страницу программы
      </button>
    </div>
  );
});
