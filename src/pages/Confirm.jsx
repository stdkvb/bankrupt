import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

import api from "../utils/Api";

const Confirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const confirmCode = searchParams.get("confirmCode");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const confirmUser = () => {
    api
      .confirmUser(userId, confirmCode)
      .then((data) => {
        if (data.status === "success") {
          setIsSuccess(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(confirmUser, []);

  if (!loading) {
    return (
      <Box
        sx={{
          maxWidth: "420px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isSuccess ? (
          <>
            <Typography variant="h5" color="text.secondary">
              Email успешно подтверждён.
            </Typography>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              sx={{ mt: 4, width: { xs: "100%", sm: "266px" } }}
            >
              Авторизоваться
            </Button>
          </>
        ) : (
          <>
            <Typography variant="p" color="text.secondary">
              Произошла ошибка, попробуйте позже.
            </Typography>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              sx={{ mt: 4, width: { xs: "100%", sm: "266px" } }}
            >
              Вернуться назад
            </Button>
          </>
        )}
      </Box>
    );
  } else {
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
};

export default Confirm;
