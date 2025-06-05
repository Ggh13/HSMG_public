import React, { FC } from 'react';
import styles from './SelectAnthropometry.module.css';
import { BodyMeasurementType } from '../../types/types';



interface SelectAnthropometryProps {
  value?: BodyMeasurementType;
  onChange?: (value: BodyMeasurementType) => void;
  disabled?: boolean;
}

export const SelectAnthropometry: FC<SelectAnthropometryProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const measurementOptions = [
    { value: 'height', label: 'Рост (см)' },
    { value: 'weight', label: 'Вес (кг)' },
    { value: 'neck_girth', label: 'Обхват шеи (см)' },
    { value: 'shoulder_girth', label: 'Обхват плеч (см)' },
    { value: 'chest_girth', label: 'Обхват груди (см)' },
    { value: 'waist_girth', label: 'Обхват талии (см)' },
    { value: 'biceps_girth', label: 'Обхват бицепса (см)' },
    { value: 'forearms_girth', label: 'Обхват предплечья (см)' },
    { value: 'hip_girth', label: 'Обхват бедер (см)' },
    { value: 'quadriceps_girth', label: 'Обхват квадрицепса (см)' },
    { value: 'calf_girth', label: 'Обхват икры (см)' },
    { value: 'wrist_girth', label: 'Обхват запястья (см)' },
    { value: 'ankle_girth', label: 'Обхват лодыжки (см)' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as BodyMeasurementType);
  };

  return (
    <section className={styles["select__container"]}>
      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={styles["select__element"]}
      >
        <option value="">Выберите параметр</option>
        {measurementOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
};

