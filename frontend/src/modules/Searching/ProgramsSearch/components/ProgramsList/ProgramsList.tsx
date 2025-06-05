import { FC } from "react";
import { GeneralProgramInformation } from "../../types/types";
import { ProgramItem } from "../ProgramItem/ProgramItem";
import styles from "./ProgramsList.module.css";

interface ProgramsListProps {
  programs: GeneralProgramInformation[];
}

export const ProgramsList: FC<ProgramsListProps> = ({ programs }) => {
  return (
    <ul className={styles["programs-list__list"]}>
      {programs?.map((program) => (
        <li key={program.training_id}>
          <ProgramItem program={program} />
        </li>
      ))}
    </ul>
  );
};
