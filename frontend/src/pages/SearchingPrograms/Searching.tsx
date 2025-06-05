import { observer } from 'mobx-react-lite';
import { ProgramsSearch } from '@/modules/Searching/ProgramsSearch/components/ProgramsSearch/ProgramsSearch';
import { FC, useState } from 'react';
import styles from './Searching.module.css';
import { UsersSearch } from '@/modules/Searching/UsersSearch/components/UsersSearch/UsersSearch';

export const Searching: FC = observer(() => {
  const [activeTab, setActiveTab] = useState("trainings");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`m20 ${styles.tab} ${activeTab === "trainings" ? styles.active : ""}`}
          onClick={() => setActiveTab("trainings")}
        >
          Тренировки
        </button>
        <button
          className={`m20 ${styles.tab} ${activeTab === "users" ? styles.active : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Пользователи
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "trainings" && <ProgramsSearch />}
        {activeTab === "users" && <UsersSearch />}
      </div>
    </div>
  );
});
