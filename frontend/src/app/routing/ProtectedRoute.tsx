import { FC, ReactNode, useContext } from "react";
import { StoreContext } from "../provider";
import { Navigate } from "react-router-dom";



interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { authStore } = useContext(StoreContext);

  if (!authStore.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}