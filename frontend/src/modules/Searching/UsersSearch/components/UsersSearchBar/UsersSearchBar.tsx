import { FC } from "react";
import SearchInput from "@/ui/SearchInput/SearchInput";
import styles from "./UsersSearchBar.module.css";
import blackArrow from "@/ui/imgs/blackArrow.svg";
import { Link } from "react-router-dom";
import { profileStore, searchTrainingsStore } from "@/app/provider/StoreProvider";
import { ClearInputButton } from "@/ui/buttons/ClearInputButton/ClearInputButton";

interface UsersSearchBarProps {
  search_bar: string;
  handleSearchChange: (value: string) => void;
}

export const UsersSearchBar: FC<UsersSearchBarProps> = ({
  search_bar,
  handleSearchChange,
}) => {
  return (
    <section className={styles["users-search-bar__container"]}>
      <Link to={`AccountPage/${profileStore.user.user_id}`}>
        <img src={blackArrow} alt="Назад" />
      </Link>
      <SearchInput
        value={search_bar}
        onChange={handleSearchChange}
        placeholder="Найти спортсмена..."
      />
      <ClearInputButton value={search_bar} onClear={() => {
          searchTrainingsStore.setSearchQuery("");
          searchTrainingsStore.findTrainings("");
        }} />
    </section>
  );
};
