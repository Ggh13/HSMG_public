import { FC } from 'react';
import styles from './TrainingProgramDescription.module.css';
import { TrainingProgram } from '@/modules/TrainingConstructor/types/types';
import { ReadMore } from '@/components/readMore/ReadMore';
import { Training_Img } from '@/ui/training_img/training_img';

import { EditHeader } from '@/components/editHeader/EditHeader';
// import { EditButton } from '@/ui/buttons/EditButton/EditButton';
import { observer } from 'mobx-react-lite';

interface TrainingProgramDescriptionProps {
  program: TrainingProgram;
}

export const TrainingProgramDescription: FC<TrainingProgramDescriptionProps> = observer(
  ({ program }) => {
    return (
      <section className={styles['program__info']}>
        <div className={styles['program__info_container']}>
          <header className={styles['program__header']}>
            <EditHeader link={`/ChangeTrainingProgramData/${program.training_id}`} to={`/UserTrainingPrograms/${program.author?.user_id}`} />

            <div className={styles['program_img']}>
              <Training_Img src={program.image} />
            </div>
            <div className={styles['program__main_info']}>
              <h2 className={`${styles['program__title']} m24bold`}>{program.name}</h2>
            </div>
          </header>
          <div className={styles['program__description']}>

            {program.description?.length > 25 ? (
              <ReadMore text={program.description} />
            ) : (
              <span className="m16med">{program.description}</span>
            )}
          </div>
        </div>
      </section>

    );
  },
);
