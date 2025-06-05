import { FC } from "react";
import SearchInput from "@/ui/SearchInput/SearchInput";
import styles from "./ProgramsSearchBar.module.css";
import blackArrow from "@/ui/imgs/blackArrow.svg";
import { Link } from "react-router-dom";
import { searchTrainingsStore } from "@/app/provider/StoreProvider";
import { ClearInputButton } from "@/ui/buttons/ClearInputButton/ClearInputButton";

interface ProgramsSearchBarProps {
  search_bar: string;
  handleSearchChange: (value: string) => void;
}

export const ProgramsSearchBar: FC<ProgramsSearchBarProps> = ({
  search_bar,
  handleSearchChange,
}) => {
  return (
    <section className={styles["programs-search-bar__container"]}>
      <Link to={`/TrainingMenu`}>
        <img src={blackArrow} alt="Назад" />
      </Link>
      <SearchInput
        value={search_bar}
        onChange={handleSearchChange}
        placeholder="Найти тренировку..."
      />
      <ClearInputButton value={search_bar} onClear={() => {
          searchTrainingsStore.setSearchQuery("");
          searchTrainingsStore.findTrainings("");
        }} />
    </section>
  );
};
