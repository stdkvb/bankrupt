import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Confirm from "./pages/Confirm";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Rates from "./pages/Rates";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Folder from "./pages/Folder";
import QA from "./pages/QA";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";
import News from "./pages/News";
import Article from "./pages/Article";
import Wiki from "./pages/Wiki";

import api from "./utils/Api";

import MainLayout from "./layouts/MainLayout";

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [errors, setErrors] = useState([]);
  const [folders, setFolders] = useState([]);
  const [mainFolder, setMainFolder] = useState();

  //load catalog
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
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(getAccess, []);

  //load folders
  const getFolders = () => {
    api
      .getFolders()
      .then((data) => {
        if (data.status === "success") {
          setFolders(data.data);
          setMainFolder(data.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getFolders, []);

  //login
  const handleLoginSubmit = ({ login, password }) => {
    api
      .loginUser(login, password)
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("token", data.data.token);
          setLoggedIn(true);
          setLoading(true);
          setErrors([]);
          getAccess();
          getFolders();
          navigate("/");
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //logout
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  //filter catalog
  const handleFilterSubmit = (event) => {
    if (event) {
      //if filters form submit
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
    } else {
      //if filters form reset
      api
        .getCatalog()
        .then((data) => {
          if (data.status === "success") {
            setCatalog(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Routes>
      {loading ? (
        <Route
          path="/"
          element={
            <CircularProgress
              sx={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                margin: "auto",
              }}
            />
          }
        />
      ) : loggedIn ? (
        <Route
          path="/"
          element={
            <MainLayout
              loading={loading}
              onLogout={handleLogout}
              folders={folders}
              updateFolders={getFolders}
            />
          }
        >
          <Route
            index
            path="/"
            element={
              <Catalog
                title={"Каталог"}
                data={catalog}
                onFilterSubmit={handleFilterSubmit}
                loading={loading}
                folders={folders}
                updateFolders={getFolders}
                updateCatalog={getAccess}
              />
            }
          />
          <Route
            path="favorites"
            element={<Favorites folders={folders} mainFolder={mainFolder} />}
          />
          <Route path="favorites/:id" element={<Folder folders={folders} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="rates" element={<Rates />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<Article />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="qa" element={<QA />} />
          <Route path="*" element={<PageNotFound loggedIn={loggedIn} />} />
        </Route>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            path="/"
            element={
              <Login onLoginSubmit={handleLoginSubmit} errors={errors} />
            }
          />
          <Route path="sign-up" element={<Registration />} />
          <Route
            path="confirm/:userId/:registrationCode"
            element={<Confirm />}
          />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="recovery" element={<NewPassword />} />
          <Route path="*" element={<PageNotFound loggedIn={loggedIn} />} />
        </Route>
      )}
    </Routes>
  );
}
