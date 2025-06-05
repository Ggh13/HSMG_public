import { StoreContext } from '@/app/provider';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';
import { TrainingStatisticsGraph } from '@/modules/Statistics/TrainingStatistics/components/TrainingStatisticsGraph/TrainingStatisticsGraph';
import { TrainingStatisticsHeader } from '@/modules/Statistics/TrainingStatistics/components/TrainingStatisticsHeader/TrainingStatisticsHeader';
import { TrainingStatisticsMenu } from '@/modules/Statistics/TrainingStatistics/components/TrainingStatisticsMenu/TrainingStatisticsMenu';
import { ExerciseFilter } from '@/modules/Statistics/TrainingStatistics/types/types';
import { ExerciseFromLib } from '@/modules/TrainingConstructor/types/types';
import { Loader } from '@/ui/loader/Loader';
import { SelectExercise } from '@/ui/SelectExercise/SelectExercise';
import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './TrainingStatisticsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export const TrainingStatisticsPage: FC = observer(() => {
  const { id_user } = useParams();
  const { authStore, trainingConstructorStore, trainingStatisticsStore } = useContext(StoreContext);
  const [activeChart, setActiveChart] = useState<'count' | 'weight'>('count');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseFromLib | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOwner(Number(id_user) === Number(authStore?.user?.user_id));
    const initialize = async () => {
      try {
        await trainingConstructorStore.GetAllExercisesFromLib();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing exercises:', error);
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (isOwner) {
      if (isInitialized && selectedExercise && activeChart) {
        const ExFilter: ExerciseFilter = {
          user_id: Number(authStore?.user?.user_id),
          id_exercise: Number(selectedExercise.id),
          typeData: activeChart,
        };
        trainingStatisticsStore.getTrainingStatistics(ExFilter);
      }
    }
    else {
      if (isInitialized && selectedExercise && activeChart) {
        const ExFilter: ExerciseFilter = {
          user_id: Number(id_user),
          id_exercise: Number(selectedExercise.id),
          typeData: activeChart,
        };
        trainingStatisticsStore.getUserTrainingStatistics(Number(id_user), ExFilter);
      }
    }
  }, [selectedExercise, isInitialized, activeChart]);

  return (
    <section className={styles['training-statistics__container']}>
      <BasicHeader onClick={() => navigate(`/AccountPage/${id_user}`)} />
      <TrainingStatisticsHeader />
      <SelectExercise
        value={selectedExercise}
        onChange={setSelectedExercise}
        allEx={trainingConstructorStore.all_ex_to_choose}
      />
      {selectedExercise && (
        <>
          <TrainingStatisticsMenu
            buttons={[
              { id: 'count', label: 'повторения' },
              { id: 'weight', label: 'веса' },
            ]}
            defaultSelected="count"
            onButtonChange={(id) => setActiveChart(id as 'count' | 'weight')}
          />

          {trainingStatisticsStore.loading ? (
            <Loader />
          ) : (
            <TrainingStatisticsGraph
              typeData={activeChart}
              data={trainingStatisticsStore.ex_statistics}
            />
          )}
        </>
      )}
    </section>
  );
});
