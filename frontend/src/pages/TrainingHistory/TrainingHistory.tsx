import { FC } from 'react';
import { useLoadHistory } from '@/modules/TrainingHistory/useLoadHistory';
import { Loader } from '@/ui/loader/Loader';
import { profileStore } from '@/app/provider/StoreProvider';
import { ArrowBackButton } from '@/ui/buttons/ArrowBackButton/ArrowBackButton';
import { ExerciseInHistoryList } from '@/modules/TrainingHistory/components/ExerciseInHistoryList/ExerciseInHistoryList';
import styles from './TrainingHistory.module.css';
import add from '@/ui/imgs/bluePlus.svg';
import { Link } from 'react-router';
import { observer } from 'mobx-react-lite';
export const TrainingHistory: FC = observer(() => {
  const { loading, exercises } = useLoadHistory(String(profileStore.user.user_id));

  if (loading) return <Loader />;

  return (
    <section className={styles['history__container']}>
      <ArrowBackButton src={'/TrainingMenu'} />

      <header className={styles['history__header']}>
        <h1 className={`m24bold ${styles['history__title']}`}>История тренировок</h1>
        <Link className={styles['history__add-button']} to="/AddDoneExercise">
          <img src={add} alt="Добавить упражнение" />
        </Link>
      </header>

      {!exercises ? (
        <p className="m16">У вас пока нет истории тренировок</p>
      ) : (
        <ExerciseInHistoryList exercises={exercises} />
      )}
    </section>
  );
});
