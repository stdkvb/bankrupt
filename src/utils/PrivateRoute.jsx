import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function PrivateRoute({ loggedIn }) {
  return loggedIn ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
