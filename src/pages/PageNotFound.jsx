import React from "react";

import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const PageNotFound = ({ loggedIn }) => {
  //for navigate to previous page
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        alignItems: "center",
        textAlign: "center",
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        margin: "auto",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        zIndex: "10000",
        justifyContent: "center",
        px: 4,
      }}
    >
      <Typography
        color="text.secondary"
        sx={{ fontSize: "100px", fontWeight: "500", lineHeight: "100%" }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        component="h1"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Страница не найдена
      </Typography>
      <Typography variant="p" color="text.secondary">
        Страница, на которую вы пытаетесь попасть, не существует или была
        удалена.
      </Typography>
      {loggedIn ? (
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{ mt: 4, width: { xs: "100%", sm: "266px" } }}
        >
          Вернуться
        </Button>
      ) : (
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{ mt: 4, width: { xs: "100%", sm: "266px" } }}
        >
          На главную
        </Button>
      )}
    </Stack>
  );
};

export default PageNotFound;
