import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import AccessDenied from "./pages/AccessDenied";

import api from "./utils/Api";
import { UserContext } from "./utils/UserContext";
import getToken from "./utils/GetToken";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const initialLoggedIn = Boolean(getToken());
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
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
        if (
          data.status === "error" &&
          data.errors[0].message ==
            "Доступ закрыт, вы зашли с другого устройства"
        ) {
          setLoggedIn(false);
          localStorage.removeItem("token");
          navigate("/access-denied");
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

  //check session on pathname change
  useEffect(() => {
    if (location.pathname !== "access-denied") {
      getAccess();
    }
  }, [location.pathname]);

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

  if (loading) {
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
  }

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
              getAccess={getAccess}
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
          <Route
            path="rates"
            element={
              <Rates updateUser={getAccess} handleLogout={handleLogout} />
            }
          />
          <Route
            path="wiki"
            element={<Wiki paid={false} handleLogout={handleLogout} />}
          />
          <Route
            path="documents"
            element={<Wiki paid={true} handleLogout={handleLogout} />}
          />
          <Route path="news" element={<News handleLogout={handleLogout} />} />
          <Route path="news/:id" element={<Article />} />
          <Route
            path="contacts"
            element={<Contacts handleLogout={handleLogout} />}
          />
          <Route path="qa" element={<QA handleLogout={handleLogout} />} />
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
          <Route path="reg-finish" element={<Confirm />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="recovery" element={<NewPassword />} />
          <Route path="access-denied" element={<AccessDenied />} />
          <Route path="*" element={<PageNotFound loggedIn={loggedIn} />} />
        </Route>
      )}
    </Routes>
  );
}
