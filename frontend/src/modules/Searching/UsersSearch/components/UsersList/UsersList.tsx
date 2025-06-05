import { FC } from "react";
import { UserInformation } from "../../types/types";
import { UserItem } from "../UserItem/UserItem";
import styles from "./UsersList.module.css";

interface UsersListProps {
  users: UserInformation[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
  return (
    <ul className={styles["users-list__list"]}>
      {users?.map((user) => (
        <li key={user.user.user_id}>
          <UserItem user={user} />
        </li>
      ))}
    </ul>
  );
};
