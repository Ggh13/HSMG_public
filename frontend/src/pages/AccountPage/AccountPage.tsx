import { FC, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileInfo } from "@/modules/Profile/components/ProfileInfo/ProfileInfo";
import { observer } from "mobx-react-lite";
import styles from "./AccountPage.module.css";
import { Loader } from "@/ui/loader/Loader";
import { StoreContext } from "@/app/provider";
import { IUser } from "@/modules/Profile/types/types";

export const AccountPage: FC = observer(() => {
  const { user_id } = useParams();
  const { profileStore } = useContext(StoreContext);

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadUser = async () => {
      if (Number(user_id) !== profileStore.user.user_id) {
        try {
          const fetchedUser = await profileStore.GetUserDataById(
            Number(user_id)
          );
          setUser(fetchedUser);
        } catch (e) {
          console.error("Ошибка при загрузке профиля", e);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(profileStore.user);
        setLoading(false);
      }
    };

    loadUser();
  }, [user_id]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.info}>
        <ProfileInfo user={user} />
      </div>
    </div>
  );
});
