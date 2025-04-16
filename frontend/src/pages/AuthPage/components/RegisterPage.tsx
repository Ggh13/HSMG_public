import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RegisterForm } from '../../../modules/AuthorizationForm';
import { useRegister } from '../../../modules/AuthorizationForm';
import HSMG from '../../../ui/imgs/HSMG.svg';
import styles from "./RegisterPage.module.css";

export const RegisterPage: React.FC = observer(() => {
    const register = useRegister();

    if (register.isRegistered) {
        return <Navigate to={`/Login`} replace />;
    }

    return (
        <div className={styles.registration}>
            <div className={styles.registration__container}>
                <div className={styles.logo}>
                    <img src={HSMG} alt="Logo" />
                </div>
                <RegisterForm {...register} />
            </div>
            <footer className={styles.registration__footer}>
                <h3 className={`${styles.footer__title} m16`}>Уже есть аккаунт?</h3>
                <Link className={`${styles.footer__link} m16`} to="/Login">
                    Войти
                </Link>
            </footer>
        </div>
    );
});