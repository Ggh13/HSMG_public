import { FC, useEffect, useState } from 'react';
import styles from './SaveModal.module.css';
import close from '@/ui/imgs/grey_close.svg';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCansel: () => void;
}

export const SaveModal: FC<SaveModalProps> = ({ isOpen, onClose, onConfirm, onCansel }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <section className={`${styles['modal__background']} ${isOpen ? styles['modal__open'] : ' '}`}>
      <div className={styles['modal__container']}>
        <p className="m20">
          <span>Сохранить изменения?</span>
          <img onClick={onCansel} src={close} alt="закрыть" className={styles['close__img']} />
        </p>
        <div className={styles['modal-buttons__container']}>
          <button
            type="button"
            className={`${styles['modal-gradient__button']} m16`}
            onClick={onConfirm}
          >
            Сохранить
          </button>
          <button type="button" className={`${styles['modal-grey__button']} m16`} onClick={onClose}>
            Не сохранять
          </button>
        </div>
      </div>
    </section>
  );
};
