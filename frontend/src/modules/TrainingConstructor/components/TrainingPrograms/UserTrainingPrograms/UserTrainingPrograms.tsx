import { FC, useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '@/app/provider';
import GoBackButton from '@/ui/buttons/GoBackButton/GoBackButton';
import { TrainingProgramList } from '../TrainingProgramList/TrainingProgramList';
import { observer } from 'mobx-react-lite';
import noprograms from '@/ui/imgs/archievements.svg';
import styles from './UserTrainingPrograms.module.css';
import { Loader } from '@/ui/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';

interface UserTrainingProgramsProps {
    userId: string;
}
export const UserTrainingPrograms: FC<UserTrainingProgramsProps> = observer(({ userId }) => {
    const { trainingConstructorStore, authStore } = useContext(StoreContext);
    const navigate = useNavigate();

    const isOwner = authStore.user?.user_id === Number(userId);

    useEffect(() => {
        if (isOwner) {
            trainingConstructorStore.fetchUserTrainingPrograms();
        } else {
            trainingConstructorStore.fetchUserTrainingProgramsById(Number(userId));
        }
    }, []);

    return (
        <section className={styles['programs']}>
            <div className={styles['programs__container']}>
                <div className={styles['programs__header']}>
                    <header className={styles['programs__header__without_button']}>
                        <GoBackButton className={styles['go-back__button']} onClick={isOwner ? () => navigate(`/TrainingMenu`) :
                            () => navigate(`/AccountPage/${userId}`)
                        } />
                        <h2 className={styles['programs__title']}>
                            <p className="m20">
                                {isOwner ? 'Мои авторские программы' : `Программы пользователя`}
                            </p>
                        </h2>
                    </header>
                </div>
                {isOwner ?
                    <Link to={'/CreateNewProgram'} className={styles['button__container']}>
                        <button className={`${styles["add-program__button"]} m16med`}>
                            Создать новую программу
                        </button>
                    </Link>
                    : <></>}
                {trainingConstructorStore.loading ? (
                    <Loader />
                ) : trainingConstructorStore.error ? (
                    <p className="m20">{trainingConstructorStore.error}</p>
                ) : trainingConstructorStore.user_trainings.length > 0 ? (
                    <TrainingProgramList programs={trainingConstructorStore.user_trainings} isOwner={isOwner} />
                ) : (
                    <div className={styles['noprograms__main']}>
                        <p className="m16">
                            {isOwner ? 'Создайте свою первую программу!' : 'Пока нет доступных программ.'}
                        </p>
                        {isOwner && (
                            <img className={styles['noprograms__img']} src={noprograms} alt="Нет программ" />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
});
