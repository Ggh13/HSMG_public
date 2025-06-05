import { FC, useEffect } from 'react';
import styles from './CurrentPrograms.module.css';
// import { useLoadPrograms } from '@/modules/TrainingProcess/hooks/useLoadPrograms';
import { CurrentProgramsList } from '@/modules/TrainingProcess/components/CurrentProgramsList/CurrentProgramsList';
import { ArrowBackButton } from '@/ui/buttons/ArrowBackButton/ArrowBackButton';
import { observer } from 'mobx-react-lite';
import { Loader } from '@/ui/loader/Loader';
import { trainingProcessStore } from '@/app/provider/StoreProvider';

export const CurrentPrograms: FC = observer(() => {
  // const { loading, programs } = useLoadPrograms();
  // const { loading, programs } = trainingProcessStore;

  useEffect(() => {
    trainingProcessStore.GetPrograms();
    // console.log(JSON.stringify(trainingProcessStore.GetPrograms()))
  }, []);

  // if (loading) return <Loader />;
  if (trainingProcessStore.loading) return <Loader />;

  return (
    <section className={styles["current-programs__container"]}>
      <ArrowBackButton src={'/TrainingMenu'} />
      <h1 className={`m24bold ${styles["current-programs__title"]}`}>Мои программы</h1>
      {/* {programs.training_programs.length === 0 ? (
        <p className="m16">У вас пока нет активных программ</p>
      ) : ( */}
        <CurrentProgramsList programs={trainingProcessStore.programs.training_programs} />
      {/* )} */}
    </section>
  );
});
