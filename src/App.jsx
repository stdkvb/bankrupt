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
  const [loggedIn, setLoggedIn] = useState(false);
  const [catalog, setCatalog] = React.useState([]);

  const getAccess = () => {
    api
      .getCatalog()
      .then((data) => {
        setLoggedIn(true);
        setCatalog(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getAccess, []);

  const handleLoginSubmit = ({ login, password }) => {
    api
      .loginUser(login, password)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        setLoggedIn(true);
        navigate("/");
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
      <Route exact path="/" element={<PrivateRoute loggedIn={loggedIn} />}>
        <Route exact path="/" element={<Catalog data={catalog} />} />
      </Route>
      {/* <Route
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
        path="/wiki"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <Wiki />
          </PrivateRoute>
        }
      />
      <Route
        path="/news"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <News />
          </PrivateRoute>
        }
      />
      <Route
        path="/news/:id"
        element={
          <PrivateRoute loggedIn={loggedIn}>
            <Article />
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
      /> */}
    </Routes>
  );
}
