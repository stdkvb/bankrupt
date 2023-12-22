import * as React from "react";
import { useRoutes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
import QA from "./pages/QA";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";

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
      path: "/catalog",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Catalog />,
        },
      ],
    },
    {
      path: "/contacts",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Contacts />,
        },
      ],
    },
    {
      path: "/qa",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <QA />,
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
    {
      path: "*",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <PageNotFound />,
        },
      ],
    },
  ]);
}
