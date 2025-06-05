import { BackButton } from '@/ui/buttons/BackButton/BackButton';

import { FC } from 'react';
import styles from './SaveHeader.module.css';
import { SaveButton } from '@/ui/buttons/SaveButton/SaveButton';

export const SaveHeader: FC = () => {
  return (
    <div className={styles.editHeader}>
      <BackButton />
      <SaveButton />
    </div>
  );
};
