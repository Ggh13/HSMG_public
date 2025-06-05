import { FC, ReactNode, useContext } from "react";
import { StoreContext } from "../provider";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";



interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = observer(({ children }) => {
  const { authStore } = useContext(StoreContext);

  if (!authStore.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
})