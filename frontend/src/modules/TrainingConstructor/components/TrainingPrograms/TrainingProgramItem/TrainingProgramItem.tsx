import { GeneralProgramInformation } from '@/modules/Searching/ProgramsSearch/types/types';
import { FC } from 'react';
import styles from './TrainingProgramItem.module.css';
import { Avatar } from '@/ui/avatar/Avatar';
import blue_edit from '@/ui/imgs/blue_full_edit.svg';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

interface TrainingProgramItemProps {
  program: GeneralProgramInformation;
  isOwner: boolean
}
export const TrainingProgramItem: FC<TrainingProgramItemProps> = observer(({ program, isOwner }) => {
  return (
    <section className={styles['program__container']}>
      <Avatar src={program.image} size={80} />
      <div className={styles['program']}>
        <p className={styles['program__info']}>
          <span className="m16med">
            {program.name}
          </span>
          <span className="m16">
            {program.description.length > 10
              ? `${program.description.slice(0, 10)}...`
              : program.description}
          </span>
        </p>
        <div className={styles['program__actions']}>
          {isOwner &&
            <Link to={`/ProgramPage/${program.training_id}`}>
              <img src={blue_edit} className={styles['program__edit']} />
            </Link>
          }
        </div>
      </div>
    </section>
  );
});
