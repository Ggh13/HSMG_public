import { Input } from "@/ui/input/Input";
import { Form } from "@/components/form/Form";
import { FC, useContext, useState } from "react";
import { StoreContext } from "@/app/provider";
import { IUser } from "../../types/types";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
export const ProfileEdit: FC = observer(() => {
  const {profileStore} = useContext(StoreContext);
  const [name, setName] = useState(profileStore.user.name);
  const [surname, setSurname] = useState(profileStore.user.surname);
  const [nickname, setNickname] = useState(profileStore.user.nickname);
  const [email, setEmail] = useState(profileStore.user.email);
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
        youtube_url: ""
      }
    };
    try {
      console.log("Обновление профиля:", user);
      await profileStore.UpdateUserData(user);
      await profileStore.UserData();
      console.log("Профиль успешно обновлён");
    } catch (e) {
      console.error("Ошибка при обновлении профиля:", e);
    } finally {
      // setLoading(false);
      navigate(`/AccountPage/${profileStore.user.user_id}`)
    }
  };
  return (
    <div className="">
      <Form onSubmit={handleSubmit}>
        <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)}></Input>
        <Input label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)}></Input>
        <Input label="Никнейм" value={nickname} onChange={(e) => setNickname(e.target.value)}></Input>
        <Input label="Почта" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
        <button type="submit">Сохранить</button>
      </Form>
    </div>
  )
});