import { FC, FormEvent, ReactNode } from 'react';
import styles from './Form.module.css';

interface FormProps {
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
}

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
    </form>
  );
};
