import React from "react";
import { Paper, Typography, Stack, Link } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const Notification = () => {
  const [isError, setIsError] = React.useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        py: [1],
        px: [2],
        display: "flex",
        alignItems: "center",
        gap: { xs: [3], md: [4] },
        ...(isError
          ? { backgroundColor: "error.main" }
          : { backgroundColor: "warning.main" }),
      }}
    >
      {isError ? (
        <ErrorOutlineOutlinedIcon style={{ fill: "white" }} />
      ) : (
        <WarningAmberOutlinedIcon style={{ fill: "white" }} />
      )}
      <Stack>
        <Typography variant="p" color="text.white">
          {isError
            ? "Действие вашего тарифа закончилось"
            : "Действие ващего тарифа заканчивается" + " ДАТА"}
        </Typography>
        <Typography variant="p" color="text.white">
          Обновите подписку
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Notification;
