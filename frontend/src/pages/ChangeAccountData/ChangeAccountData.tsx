import { ProfileEdit } from "@/modules/Profile/components/ProfileEdit/ProfileEdit";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import styles from "./ChangeAccountData.module.css";
export const ChangeAccountData: FC = observer(() => {
  return (
    <section className={styles.changeData__container}>
      <ProfileEdit />
    </section>
  )
});