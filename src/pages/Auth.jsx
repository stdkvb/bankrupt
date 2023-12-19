import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";

const Auth = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      login: data.get("login"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "400px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}
      >
        Авторизация
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          mb: 3,
          textAlign: { xs: "center", md: "left" },
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        Новый пользователь?
        <Link href="#" color="primary.main">
          Создать аккаунт
        </Link>
      </Typography>
      <TextField
        label="Логин"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="login"
        name="login"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="password"
        name="password"
        sx={{ mb: 1 }}
      />
      <Link href="#" color="primary.main">
        Забыли пароль?
      </Link>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Войти
      </Button>
    </Box>
  );
};

export default Auth;
