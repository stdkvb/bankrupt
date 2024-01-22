import React from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";

import Form from "../components/Form";

const Login = ({ onLoginSubmit, submitError, inactiveForm }) => {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  return (
    <Form
      title="Авторизация"
      buttonText="Войти"
      onHandleSubmit={handleSubmit}
      onSubmit={onLoginSubmit}
      submitError={submitError}
    >
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
      <Link href="/password-recovery" color="primary.main">
        Забыли пароль?
      </Link>
    </Form>
  );
};

export default Login;
