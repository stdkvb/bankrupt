import React from "react";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import MainLayout from "../layouts/MainLayout";

function PrivateRoute({ loading, loggedIn, children }) {
  return loading ? (
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
  ) : loggedIn ? (
    <MainLayout loading={loading}>{children}</MainLayout>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
