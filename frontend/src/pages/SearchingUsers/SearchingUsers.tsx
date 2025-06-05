import { observer } from 'mobx-react-lite';
import { UsersSearch } from '@/modules/Searching/UsersSearch/components/UsersSearch/UsersSearch';
import { FC } from 'react';
import styles from './SearchingUsers.module.css';

export const SearchingUsers: FC = observer(() => {
  return (
    <section className={styles['searching__container']}>
      <UsersSearch />
    </section>
  );
});
