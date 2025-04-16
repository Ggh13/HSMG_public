import { LoginPage } from "@/pages/AuthPage/components/LoginPage";
import { HomePage }  from '@/pages/HomePage/HomePage';
import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "@/pages/AuthPage/components/RegisterPage";
import { AccountPage } from "@/pages/AccountPage/AccountPage";
import { ChangeAccountData } from "@/pages/ChangeAccountData/ChangeAccountData";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout footer={false} />,
    children: [
      {
        path: "",
        element: <HomePage />
      }
    ]
  },

  {
    path: "/",
    element: <MainLayout />, // по умолчанию footer = true
    children: [
      {
        path: "AccountPage/:user_id",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        )
      },
      {
        path: "ChangeAccountData",
        element: (
          <ProtectedRoute>
            <ChangeAccountData />
          </ProtectedRoute>
        )
      }
    ]
  },

  {
    path: "login",
    element: <GuestRoute>
      <LoginPage/>
    </GuestRoute>,
  },

  {
    path: "registration",
    element: (
      <GuestRoute>
        <RegisterPage/>
      </GuestRoute>
    )
  },

]);