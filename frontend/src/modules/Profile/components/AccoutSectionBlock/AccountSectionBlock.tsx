import { FC, ReactNode } from 'react';
import styles from './AccountSectionBlock.module.css';
import { NavigationButton } from '@/ui/buttons/NavigationButton/NavigationButton';
import React from 'react';

interface AccountSectionBlockProps {
  title: string;
  link: string;
  children: ReactNode;
}

export const AccountSectionBlock: FC<AccountSectionBlockProps> = ({ title, link, children }) => {
  const isEmpty = React.Children.count(children) === 0;

  return (
    <section className={styles.section}>
      <header className={styles.section__header}>
        <h2 className={`m20 ${styles.section__title}`}>{title}</h2>
        <NavigationButton link={link} />
      </header>

      <div className={styles.section__content}>
        {isEmpty ? (
          <p className="m14">Нет данных для отображения</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
};
