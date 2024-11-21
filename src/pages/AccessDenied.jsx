import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Link,
  Box,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const AccessDenied = () => {
  return (
    <Box
      sx={{
        maxWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Доступ закрыт,
        <br />
        вы авторизовались
        <br />с другого устройства.
      </Typography>
      <Button
        component={RouterLink}
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        to="/"
      >
        Войти
      </Button>
    </Box>
  );
};

export default AccessDenied;
