import { ChangeEvent, FC } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: string | number | undefined;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  id?: string;
}

export const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  label,
  disabled = false,
  required = false,
  autoFocus = false,
  id,
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).slice(2, 8)}`;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '');
    }
  };

  return (
    <div className={styles.input__container}>
      {label && (
        <label htmlFor={inputId} className={`${styles.input__label} m12med`}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onInput={handleInput}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        className={styles.input__element}
      />
    </div>
  );
};
