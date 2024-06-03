import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import api from "../utils/Api";

const Confirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const confirmCode = searchParams.get("confirmCode");

  const confirmUser = () => {
    api
      .confirmUser(userId, confirmCode)
      .then((data) => {
        if (data.status === "success") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(confirmUser, []);

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
};

export default Confirm;
