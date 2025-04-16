import { FC, useContext } from "react";
import { StoreContext } from "@/app/provider";
import { observer } from "mobx-react-lite";

import { Avatar } from "@/ui/avatar/Avatar";
import { TgIcon } from "@/ui/tgIcon/TgIcon";
import { NavigationButton } from "@/ui/buttons/NavigationButton/NavigationButton";

import { IUser } from "../../types/types";

import styles from "./ProfileInfo.module.css";


interface ProfileInfoProps {
  user: IUser;
}

export const ProfileInfo: FC<ProfileInfoProps> = observer(({ user }) => {
  const { profileStore } = useContext(StoreContext);
  
  return (
    <section className={styles.profile}>
      <div className={styles.profile__container}>
        <header className={styles.profile__header}>
          <TgIcon size={30} />
        </header>
        <hr className={styles.line}></hr>
        <main className={styles.profile__main}>
          <div className={styles.profile__avatar}>
            <Avatar
              src={user.avatar}
              size={80}
            />
          </div>
          <div className={styles.profile__other}>
            <div className={styles.profile__naming}>
              <span className="m20">
                <strong>{user.name}</strong>
              </span>
              <span className="m20">
                <strong>{user.surname}</strong>
              </span>
              <span className={`${styles.profile__nickname} m16`}>
                @{user.nickname}
              </span>
            </div>
            {user.user_id === profileStore.user.user_id && (<div className="">
              <NavigationButton link="/ChangeAccountData" />
            </div>)}
            
          </div>
        </main>
      </div>
    </section>
  );
});


