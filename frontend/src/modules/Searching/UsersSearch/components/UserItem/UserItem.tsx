import { FC } from "react";
import { UserInformation } from "../../types/types";
import { Avatar } from "@/ui/avatar/Avatar";
import styles from "./UserItem.module.css";
import { useNavigate } from "react-router-dom";

interface UserItemProps {
  user: UserInformation;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["user-item__container"]}
      onClick={() => navigate(`/AccountPage/${user.user.user_id}`)}
    >
      <Avatar src={user.user.avatar} size={80} />
      <div className={styles["user-item__info"]}>
        <h3 className={`m20bold ${styles["user-item__name"]}`}>
          {user.user.name} {user.user.surname}
        </h3>
        <p className={`${styles["user-item__description"]} m16`}>
          {user.user.nickname.slice(0, 30)}...
        </p>
      </div>
    </div>
  );
};
