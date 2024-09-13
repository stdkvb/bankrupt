import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Confirm from "./pages/Confirm";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Rates from "./pages/Rates";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import QA from "./pages/QA";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";
import News from "./pages/News";
import Article from "./pages/Article";
import Wiki from "./pages/Wiki";

import api from "./utils/Api";
import { UserContext } from "./utils/UserContext";
import getToken from "./utils/GetToken";
import { Paper, Typography } from "@mui/material";

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [folders, setFolders] = useState([]);
  const [mainFolder, setMainFolder] = useState({});

  //token check
  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoggedIn(true);
      getAccess();
    }
    setLoading(false);
  }, []);

  //load catalog
  const getAccess = () => {
    api
      .getUser()
      .then((data) => {
        if (data.status === "success") {
          setUser(data.data);
        }
        if (data.status === "error") {
          handleLogout();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .getFolders()
      .then((data) => {
        if (data.status === "success") {
          setFolders(data.data.list);
          setMainFolder(
            data.data.list.filter((folder) => folder.main == true)[0]
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //update folders
  const updateFolders = () => {
    api
      .getFolders()
      .then((data) => {
        if (data.status === "success") {
          setFolders(data.data.list);
          setMainFolder(
            data.data.list.filter((folder) => folder.main == true)[0]
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //login
  const handleLoginSubmit = ({ login, password }) => {
    api
      .loginUser(login, password)
      .then((data) => {
        if (data.status === "success") {
          const now = new Date();
          const token = {
            value: data.data.token,
            expiry: now.getTime() + 24 * 60 * 60 * 1000,
          };
          localStorage.setItem("token", JSON.stringify(token));
          setLoggedIn(true);
          setLoading(true);
          setErrors([]);
          getAccess();
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
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading)
    return (
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
    );

  return (
    <Routes>
      {loggedIn ? (
        <Route
          path="/"
          element={
            <MainLayout
              loading={loading}
              onLogout={handleLogout}
              folders={folders}
              updateFolders={updateFolders}
            />
          }
        >
          <Route
            index
            path="/"
            element={
              <Catalog
                title={"Каталог"}
                loading={loading}
                folders={folders}
                updateFolders={updateFolders}
                updateCatalog={getAccess}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorites
                loading={loading}
                folders={folders}
                mainFolder={mainFolder}
                updateFolders={updateFolders}
                updateCatalog={getAccess}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="favorites/:id"
            element={
              <Favorites
                loading={loading}
                folders={folders}
                mainFolder={mainFolder}
                updateFolders={updateFolders}
                updateCatalog={getAccess}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="profile" element={<Profile updateUser={getAccess} />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="rates" element={<Rates updateUser={getAccess} />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<Article />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="qa" element={<QA />} />
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
          <Route path="reg-finish" element={<Confirm />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="recovery" element={<NewPassword />} />
        </Route>
      )}
      <Route path="*" element={<PageNotFound loggedIn={loggedIn} />} />
    </Routes>
  );
}
