import { FC } from "react";
import styles from './AddButton.module.css';
import { Link } from "react-router-dom";

interface AddButtonProps {
  to: string;
  text: string;
}

export const AddButton: FC<AddButtonProps> = ({to,  text}) => {
  return (
    <Link to={to} className={`m16 ${styles.addButton}`}>{text}</Link>
  )
}