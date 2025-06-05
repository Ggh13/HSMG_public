
import { ProgramInfo } from '@/modules/TrainingProcess/components/ProgramInfo/ProgramInfo';
import { Loader } from '@/ui/loader/Loader';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProgramPromo.module.css';
import { BasicHeader } from '@/components/basicHeader/BasicHeader';
import { ProgramPromoDaysList } from '@/modules/TrainingProcess/components/ProgramPromoDaysList/ProgramPromoDaysList';
import { trainingProcessStore } from '@/app/provider/StoreProvider';
export const ProgramPromo: FC = observer(() => {
  const { program_id } = useParams();

  useEffect(() => {
    if (!program_id) return;
    trainingProcessStore.GetProgram(program_id);
  }, [program_id]);

  if (trainingProcessStore.loading) {
    return <Loader />;
  }

  return (
    <div className={styles["program-promo__container"]}>
      <main className={styles["program-promo__main"]}>
        <div className={styles["program-promo__header"]}>
          <BasicHeader />
        </div>
        <ProgramInfo program={trainingProcessStore.program} />
        <ProgramPromoDaysList days={trainingProcessStore.program.training_days} />
      </main>
    </div>
  );
});
