import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  //for navigate to previous page
  const navigate = useNavigate();

  return (
    <Stack
      sx={{ maxWidth: "640px", alignItems: "center", textAlign: "center" }}
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
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{ mt: 4, width: { xs: "100%", md: "266px" } }}
      >
        Вернуться
      </Button>
    </Stack>
  );
};

export default PageNotFound;
