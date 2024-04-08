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

const Login = ({ onLoginSubmit, errors }) => {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    if (e.target.validity.valid) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      noValidate
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
        <Link component={RouterLink} to="/sign-up" color="primary.main">
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
        error={loginError}
        helperText={loginError ? "Введите логин" : ""}
        value={login}
        onChange={handleLoginChange}
      />
      <FormControl variant="standard" fullWidth error={passwordError}>
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <Input
          id="password"
          variant="standard"
          size="medium"
          required
          name="password"
          error={passwordError}
          value={password}
          onChange={handlePasswordChange}
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
      {passwordError && (
        <Typography
          color="error.main"
          sx={{ width: "100%", fontSize: "0.75rem", mt: "3px" }}
        >
          Введите пароль
        </Typography>
      )}
      {errors.map((error, i) => {
        return (
          <Typography color="error.main" sx={{ my: 2 }} key={i}>
            {error.message}
          </Typography>
        );
      })}
      <Link
        sx={{ mt: 1 }}
        component={RouterLink}
        to="/password-recovery"
        color="primary.main"
      >
        Забыли пароль?
      </Link>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={!(login && password)}
      >
        Войти
      </Button>
    </Box>
  );
};

export default Login;
