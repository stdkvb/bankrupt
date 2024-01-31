import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ onLoginSubmit, errors }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginSubmit({ login, password });
  };

  // show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
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
      <FormControl sx={{ mb: 1 }} variant="standard" fullWidth>
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <Input
          id="password"
          variant="standard"
          size="medium"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
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
