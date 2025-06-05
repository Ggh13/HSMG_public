import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./PlusAddButton.module.css";
import bluePlus from "@/ui/imgs/bluePlus.svg";
interface PlusAddButtonProps {
  src: string;
}


export const PlusAddButton: FC<PlusAddButtonProps> = ({src}) => {
  return (
    <Link to={src}>
      <button className={styles.add__button}>
        <img className={styles.add__img} src={bluePlus} alt="" />
      </button>
    </Link>
  )
}