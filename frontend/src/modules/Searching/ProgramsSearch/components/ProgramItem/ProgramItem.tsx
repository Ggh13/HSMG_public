import { FC } from "react";
import { GeneralProgramInformation } from "../../types/types";
import { Avatar } from "@/ui/avatar/Avatar";
import styles from "./ProgramItem.module.css";
import { useNavigate } from "react-router-dom";

interface ProgramItemProps {
  program: GeneralProgramInformation;
}

export const ProgramItem: FC<ProgramItemProps> = ({ program }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["program-item__container"]}
      onClick={() => navigate(`/ProgramPromo/${program.training_id}`)}
    >
      <Avatar src={program.image} size={80} />
      <div className={styles["program-item__info"]}>
        <h3 className={`m20bold ${styles["program-item__name"]}`}>
          {program.name} {program.training_id}
        </h3>
        <p className={`${styles["program-item__description"]} m16`}>
          {program.description.slice(0, 20)}...
        </p>
      </div>
    </div>
  );
};
