import React from 'react';
import styles from "./MobileHeader.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm 
}) => (
  <div className={`${styles.modal} ${isOpen ? styles.modalOpen : ""}`}>
    <div className={`${styles.modalContent} m16`}>
      <p>Выйти из аккаунта?</p>
      <div className={styles.modalButtons}>
        <button className={styles.modalButtonConfirm} onClick={onConfirm}>
          Выйти
        </button>
        <button className={styles.modalButtonCancel} onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  </div>
);