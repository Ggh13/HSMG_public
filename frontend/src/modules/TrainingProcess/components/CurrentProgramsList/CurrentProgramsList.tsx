import { FC } from 'react';
import { Program } from '../../types/types';
import { CurrentProgramItem } from '../CurrentProgramItem/CurrentProgramItem';
import styles from './CurrentProgramsList.module.css';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

interface CurrentProgramsListProps {
  programs: Program[];
}

export const CurrentProgramsList: FC<CurrentProgramsListProps> = observer(({ programs }) => {
  if (programs == null || programs.length === 0) {
    return (
      <p className="m16med">
        Нет добавленных программ<br></br>
        <br></br>Перейдите в поиск, чтобы найти и добавить подходящую программу
      </p>
    );
  }
  const navigate = useNavigate();

  return (
    <ul className={styles['current-programs__list']}>
      {programs.map((item) => (
        <li key={item.training_id} onClick={() => navigate(`/CurrentProgram/${item.training_id}`)}>
          <CurrentProgramItem {...item} />
        </li>
      ))}
    </ul>
  );
});
