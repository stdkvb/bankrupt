import * as React from "react";
import { useRoutes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";

export default function App() {
  return useRoutes([
    {
      path: "/profile",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
    {
      path: "/registration",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Registration />,
        },
      ],
    },
    {
      path: "/password-recovery",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <PasswordRecovery />,
        },
      ],
    },
    {
      path: "/new-password",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <NewPassword />,
        },
      ],
    },
  ]);
}
