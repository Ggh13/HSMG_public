import { GeneralProgramInformation } from '@/modules/Searching/ProgramsSearch/types/types';
import { TrainingProgramItem } from '../TrainingProgramItem/TrainingProgramItem';
import { FC } from 'react';
import styles from './TrainingProgramList.module.css';

interface TrainingProgramListProps {
  programs: GeneralProgramInformation[];
  isOwner: boolean
}
export const TrainingProgramList: FC<TrainingProgramListProps> = ({ programs, isOwner }) => {
  return (
    <ul className={styles['programs-list__list']}>
      {programs?.map((program) => (
        <li key={program.training_id}>
          <TrainingProgramItem program={program} isOwner={isOwner}/>
        </li>
      ))}
    </ul>
  );
};
