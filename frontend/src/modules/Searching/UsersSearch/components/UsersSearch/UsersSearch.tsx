import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/app/provider";
import { UsersSearchBar } from "../UsersSearchBar/UsersSearchBar";
import { UsersList } from "../UsersList/UsersList";
import styles from "./UsersSearch.module.css";
import { Loader } from "@/ui/loader/Loader";

export const UsersSearch = observer(() => {
  const { searchUsersStore } = useContext(StoreContext);

  useEffect(() => {
    searchUsersStore.findUsers();
  }, [searchUsersStore]);

  return (
    <section className={styles["users-search__container"]}>
      <UsersSearchBar
        search_bar={searchUsersStore.searchQuery}
        handleSearchChange={(value) => {
          searchUsersStore.setSearchQuery(value);
          searchUsersStore.findUsers(value);
        }}
      />
      {searchUsersStore.loading ? (
        <Loader />
      ) : searchUsersStore.error ? (
        <p className="m20">{searchUsersStore.error}</p>
      ) : searchUsersStore.results.length > 0 ? (
        <UsersList users={searchUsersStore.results} />
      ) : (
        <p className="m20">Нет спортсменов</p>
      )}
    </section>
  );
});
