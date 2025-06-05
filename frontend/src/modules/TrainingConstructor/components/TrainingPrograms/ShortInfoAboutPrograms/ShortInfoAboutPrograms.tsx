import { StoreContext } from '@/app/provider';
import { AccountSectionBlock } from '@/modules/Profile/components/AccoutSectionBlock/AccountSectionBlock';
import { FC, useContext, useEffect } from 'react';
import styles from './ShortInfoAboutPrograms.module.css';
import { Loader } from '@/ui/loader/Loader';
import { observer } from 'mobx-react-lite';

interface ShortInfoAboutProgramsProps {
  id_user: number;
}
export const ShortInfoAboutPrograms: FC<ShortInfoAboutProgramsProps> = observer(({ id_user }) => {
  const { authStore, trainingConstructorStore } = useContext(StoreContext);
  const isOwner: boolean = Number(id_user) === Number(authStore?.user?.user_id);

  useEffect(() => {
    if (isOwner) {
      trainingConstructorStore.fetchUserTrainingPrograms();
    } else {
      trainingConstructorStore.fetchUserTrainingProgramsById(id_user);
    }
  }, []);
  if (trainingConstructorStore.loading) return <Loader />

  return (
    <AccountSectionBlock
      title={isOwner ? "Мои авторские тренировки" : "Авторские тренировки"}
      link={`/UserTrainingPrograms/${id_user}`}
    >
      {trainingConstructorStore.user_trainings?.length > 0 ? (
        <div className={styles['trainingPrograms__list']}>
          {trainingConstructorStore.user_trainings
            .slice(
              trainingConstructorStore.user_trainings.length - 2,
              trainingConstructorStore.user_trainings.length,
            )
            .map((e) => (
              <div
                className={`${styles['trainingPrograms__program']} ${styles['program']}`}
                key={e.training_id}
              >
                <img
                  className={styles['program__img']}
                  src={`data:image/gif;base64,${e.image}`}
                  alt=""
                />
                <div className={styles['program__info']}>
                  <span className={`${styles['program__name']} m16med`}>{e.name}</span>
                  <span className={`${styles['program__description']} m16`}>
                    {e.description.length > 25 ? `${e.description.slice(0, 25)}...` : e.description}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={styles['trainingPrograms__empty']}>
          {isOwner ?
            <p className="m16">Создай свою авторскую тренировку!</p>
            :
            <p className="m16">У данного пользователя нет тренировочных программ</p>
          }

        </div>
      )}
    </AccountSectionBlock>
  );
});
