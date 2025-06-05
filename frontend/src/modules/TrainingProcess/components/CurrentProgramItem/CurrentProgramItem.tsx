import { FC } from 'react';
import { Program } from '../../types/types';
import styles from './CurrentProgramItem.module.css';
import { Avatar } from '@/ui/avatar/Avatar';

export const CurrentProgramItem: FC<Program> = (program) => {
  const firstDay = program.training_days?.[0];

  return (
    <article className={styles['current-program']}>
      <header className={styles['current-program__info']}>
        <Avatar src={program.image} size={60} />
        <h3 className={`m20bold ${styles['current-program__name']}`}>{program.name}</h3>
      </header>

      <hr className={styles['current-program__divider']} />

      <section className={styles['current-program__last-day']}>
        <h4 className={`m16med ${styles['current-program__day-name']}`}>
          {firstDay?.name || 'первый день'}
        </h4>
        <p className={`m14 ${styles['current-program__day-description']}`}>
          тренировка, на которой вы остановились
        </p>
      </section>
    </article>
  );
};
