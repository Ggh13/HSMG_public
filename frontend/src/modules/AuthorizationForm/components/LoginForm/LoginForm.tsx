import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';
import GoBackButtonWhite from '@/ui/imgs/GoBackButtonWhite.svg';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({email: email, password: password});
  };

  return (
    <form className={`${styles.login__form}`} onSubmit={onSubmit}>
      <div className={styles.login__header}>
        <Link to="/" className={`${styles.login__button_away} m20`}>
          <img className={styles.login__button_away} src={GoBackButtonWhite} alt="" />
        </Link>
        <div className={styles.Login__title}>
          <label className={`${styles.form__label} m20bold`}>Войдите в аккаунт</label>
        </div>
      </div>
      <div className={styles.form__inputs}>
        <input
          className={`${styles.form__input} m16`}
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={`${styles.form__input} m16`}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles.form__buttons}>
        <button className={`${styles.form__button__login} m20bold gradient-button`} type="submit">
          Вход
        </button>
        <Link to="/Registration" className={`${styles.form__button__registration} m16`}>
          Регистрация
        </Link>
      </div>
    </form>
  );
};