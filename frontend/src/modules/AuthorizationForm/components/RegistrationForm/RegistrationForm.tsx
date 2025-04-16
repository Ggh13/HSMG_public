import React from 'react';
import { RegisterFormData, RegisterFormActions } from '../../types/auth';
import BluePlus from '@/ui/imgs/bluePlus.svg';
import styles from "./RegistrationForm.module.css";

interface RegisterFormProps extends RegisterFormData, RegisterFormActions {}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    name,
    surname,
    nickname,
    email,
    password,
    fileName,
    confirmPassword,
    setName,
    setSurname,
    setNickname,
    setEmail,
    setPassword,
    setConfirmPassword,
    imageUploaded,
    handleSubmit
}) => (
    <div className={styles.registration__form__container}>
        <form className={`${styles.registration__form} ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.form__header}>
                <h3 className={`${styles.form__title} m20bold`}>Регистрация</h3>
            </div>
            <div className={styles.form__inputs}>
                <input 
                    className={`${styles.form__input} m16`}
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    className={`${styles.form__input} m16`}
                    type="text"
                    placeholder="Фамилия"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input 
                    className={`${styles.form__input} m16`}
                    type="text"
                    placeholder="Никнейм"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
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
                <input 
                    className={`${styles.form__input} m16`}
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className={styles.file_upload_container}>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={imageUploaded}
                        className={`${styles.hiddenInput} m16`}
                    />
                    <label htmlFor="imageUpload" className={`${styles.uploadButton} m14`}>
                        <img src={BluePlus} alt="" />
                        {fileName ? "Файл загружен" : "Загрузить фото профиля"}
                    </label>
                </div>
            </div>
            <button className={`${styles.form__button} m20bold gradient-button`} type="submit">
                Зарегистрироваться
            </button>
        </form>
    </div>
);