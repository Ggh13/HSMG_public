import { ShortInfoAboutPrograms } from '@/modules/TrainingConstructor/components/TrainingPrograms/ShortInfoAboutPrograms/ShortInfoAboutPrograms';
import { FC } from 'react';
import styles from './ShortInfoList.module.css';
import { StatisticsNavigator } from '@/modules/Statistics/StatisticsNavigator/StatisticsNavigator';
import { ShortInfoAboutAchieve } from '@/modules/Achievements/components/ShortInfoAboutAchieve/ShortInfoAboutAchieve';

interface ShortInfoListProps{
  user_id: number;
}

export const ShortInfoList: FC<ShortInfoListProps> = ({user_id}) => {
  return (
    <section className={styles['short-info__container']}>
      <ShortInfoAboutAchieve id_user={user_id}/>
      <ShortInfoAboutPrograms id_user={user_id}/>
      <StatisticsNavigator user_id={user_id} />
    </section>
  );
};
