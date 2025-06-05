import { FC } from 'react';
import styles from "./SeacrhInput.module.css";
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange, placeholder = 'Поиск...' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={` m20 ${styles.input}`}
    />
  );
};

export default SearchInput;
