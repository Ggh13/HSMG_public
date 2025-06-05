import { ChangeEvent, FC, useState } from "react";
import styles from "./InputAvatar.module.css";
import { Avatar } from "../avatar/Avatar";

interface InputAvatarProps {
  initialImage?: string; 
  onChange: (base64: string) => void; 
  label?: string;
  required?: boolean;
}

export const InputAvatar: FC<InputAvatarProps> = ({
  onChange,
  label,
  required = false,
  initialImage = ""
}) => {
  const [preview, setPreview] = useState(initialImage);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const base64 = result.split(',')[1];
          setPreview(base64);
          onChange(base64);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.input__container}>
      <Avatar src={preview} size={80} />
      {label && (
        <label htmlFor='upload' className={styles.input__label}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        type="file"
        id="upload"
        name="image"
        accept="image/*"
        required={required}
        onChange={handleImageUpload}
      />
    </div>
  );
};