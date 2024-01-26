import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";

const Login = ({ onLoginSubmit, errors }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginSubmit({ login, password });
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
        <Link href="/sign-up" color="primary.main">
          Создать аккаунт
        </Link>
      </Typography>
      <TextField
        label="Логин"
        variant="standard"
        size="medium"
        fullWidth
        id="login"
        name="login"
        sx={{ mb: 2 }}
        required
        value={login}
        onChange={(e) => setLogin(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.map((error, i) => {
        return (
          <Typography color="error.main" sx={{ my: 2 }} key={i}>
            {error.message}
          </Typography>
        );
      })}
      <Link href="/password-recovery" color="primary.main">
        Забыли пароль?
      </Link>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Войти
      </Button>
    </Box>
  );
};

export default Login;
