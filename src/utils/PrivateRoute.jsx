import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function PrivateRoute({ loggedIn, children }) {
  return loggedIn ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
