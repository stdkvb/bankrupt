import React from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function PrivateRoute({ loading, loggedIn, children }) {
  return (
    !loading &&
    (loggedIn ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />)
  );
}

export default PrivateRoute;
