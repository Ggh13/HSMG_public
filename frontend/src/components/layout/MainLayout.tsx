import { FC, useContext } from "react";
import { Outlet } from "react-router-dom";
import { MobileHeader } from "../header/ui/MobileHeader";
import { MobileFooter } from "../footer/MobileFooter";
import { StoreContext } from "@/app/provider";

interface MainLayoutProps {
  footer?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({ footer=true }) => {
  const { profileStore } = useContext(StoreContext);
  return (
    <div>
      <MobileHeader />
      <Outlet />
      {footer && <MobileFooter user_id={profileStore.user.user_id}/>}
    </div>
  )
}