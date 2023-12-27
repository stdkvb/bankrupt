import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import PrivateRoute from "./utils/PrivateRoute";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Rates from "./pages/Rates";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
import QA from "./pages/QA";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthLayout>
            <Registration />
          </AuthLayout>
        }
      />
      <Route
        path="/password-recovery"
        element={
          <AuthLayout>
            <PasswordRecovery />
          </AuthLayout>
        }
      />
      <Route
        path="/new-password"
        element={
          <AuthLayout>
            <NewPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <Catalog />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/rates"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <Rates />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <Contacts />
          </PrivateRoute>
        }
      />
      <Route
        path="/qa"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <QA />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <AuthLayout>
            <PageNotFound />
          </AuthLayout>
        }
      />
    </Routes>
  );
}
