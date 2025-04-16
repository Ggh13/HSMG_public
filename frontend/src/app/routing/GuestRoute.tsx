import { FC, ReactNode, useContext } from "react";
import { StoreContext } from "../provider";
import { Navigate } from "react-router-dom";



interface GuestRouteProps {
  children: ReactNode;
}

export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const { authStore } = useContext(StoreContext);

  if (authStore.isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};