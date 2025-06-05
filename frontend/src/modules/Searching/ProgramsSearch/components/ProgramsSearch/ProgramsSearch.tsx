import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/app/provider";
import { ProgramsSearchBar } from "../ProgramsSearchBar/ProgramsSearchBar";
import { ProgramsList } from "../ProgramsList/ProgramsList";
import styles from "./ProgramsSearch.module.css";
import { Loader } from "@/ui/loader/Loader";

export const ProgramsSearch = observer(() => {
  const { searchTrainingsStore } = useContext(StoreContext);

  useEffect(() => {
    searchTrainingsStore.findTrainings();
  }, [searchTrainingsStore]);

  return (
    <section className={styles["programs-search__container"]}>
      <ProgramsSearchBar
        search_bar={searchTrainingsStore.searchQuery}
        handleSearchChange={(value) => {
          searchTrainingsStore.setSearchQuery(value);
          searchTrainingsStore.findTrainings(value);
        }}
      />
      {searchTrainingsStore.loading ? (
        <Loader />
      ) : searchTrainingsStore.error ? (
        <p className="m20">{searchTrainingsStore.error}</p>
      ) : searchTrainingsStore.results.length > 0 ? (
        <ProgramsList programs={searchTrainingsStore.results} />
      ) : (
        <p className="m20">Нет тренировок</p>
      )}
    </section>
  );
});
