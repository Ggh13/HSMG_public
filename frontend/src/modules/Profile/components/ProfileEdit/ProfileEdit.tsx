import { Input } from "@/ui/input/Input";
import { Form } from "@/components/form/Form";
import { FC, useContext, useState } from "react";
import { StoreContext } from "@/app/provider";
import { IUser } from "../../types/types";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { InputAvatar } from "@/ui/InputAvatar/InputAvatar";
import { SaveHeader } from "@/components/saveHeader/SaveHeader";
import styles from "./ProfileEdit.module.css";
import { Loader } from "@/ui/loader/Loader";
export const ProfileEdit: FC = observer(() => {
  const { profileStore } = useContext(StoreContext);
  const [name, setName] = useState(profileStore.user.name);
  const [surname, setSurname] = useState(profileStore.user.surname);
  const [nickname, setNickname] = useState(profileStore.user.nickname);
  const [email, setEmail] = useState(profileStore.user.email);
  const [img, setImg] = useState(profileStore.user.avatar);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const user: IUser = {
      user_id: profileStore.user.user_id,
      name,
      surname,
      nickname,
      email,
      avatar: profileStore.user.avatar,
      social_media: {
        telegram_url: "",
        vk_url: "",
        youtube_url: "",
      },
    };
    try {
      setLoading(true);
      console.log("Обновление профиля");
      await profileStore.UpdateUserData(user);
      await profileStore.UserData();
      console.log("Профиль успешно обновлён");
    } catch (e) {
      console.error("Ошибка при обновлении профиля:", e);
    } finally {
      navigate(`/AccountPage/${profileStore.user.user_id}`);
      setLoading(false);
    }
  };
  return (
    <section className={styles.editProfile}>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <SaveHeader />
          <h1 className={`${styles.editProfile__title} m20bold`}>
            Редактирование профиля
          </h1>
          <InputAvatar
            label="Изменить фото"
            img={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <Input
            label="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            label="Фамилия"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          ></Input>
          <Input
            label="Никнейм"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></Input>
          <Input
            label="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </Form>
      )}
    </section>
  );
});
