import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";

import api from "../utils/Api";

const Login = () => {
  //inputs values
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  //inputs changes listener
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formValue;
    console.log(formValue);
    api
      .loginUser(email, password)
      .then((data) => {
        if (data.jwt) {
          setFormValue({ username: "", password: "" });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
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
        required
        fullWidth
        id="email"
        name="email"
        value={formValue.email}
        onChange={handleChange}
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
        value={formValue.password}
        onChange={handleChange}
        sx={{ mb: 1 }}
      />
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
