import * as React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
import News from "./pages/News";
import Article from "./pages/Article";
import Wiki from "./pages/Wiki";

import api from "./utils/Api";

export default function App() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [catalog, setCatalog] = React.useState([]);

  const getAccess = () => {
    api
      .getCatalog()
      .then((data) => {
        if (data.status === "success") {
          setLoggedIn(true);
          setCatalog(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  useEffect(getAccess, []);

  const handleLoginSubmit = ({ login, password }) => {
    api
      .loginUser(login, password)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        setLoggedIn(true);
        api.getCatalog().then((data) => {
          setCatalog(data.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const filters = Array.from(new FormData(event.currentTarget));
    console.log(filters);
    api
      .getCatalog(filters)
      .then((data) => {
        if (data.status === "success") {
          setCatalog(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login onLoginSubmit={handleLoginSubmit} />
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
        exact
        path="/"
        element={
          <PrivateRoute loggedIn={loggedIn} loading={loading}>
            <Catalog data={catalog} onFilterSubmit={handleFilterSubmit} />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute loggedIn={true}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/rates"
        element={
          <PrivateRoute loggedIn={true}>
            <Rates />
          </PrivateRoute>
        }
      />
      <Route
        path="/wiki"
        element={
          <PrivateRoute loggedIn={true}>
            <Wiki />
          </PrivateRoute>
        }
      />
      <Route
        path="/news"
        element={
          <PrivateRoute loggedIn={true}>
            <News />
          </PrivateRoute>
        }
      />
      <Route
        path="/news/:id"
        element={
          <PrivateRoute loggedIn={true}>
            <Article />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <PrivateRoute loggedIn={true}>
            <Contacts />
          </PrivateRoute>
        }
      />
      <Route
        path="/qa"
        element={
          <PrivateRoute loggedIn={true}>
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
