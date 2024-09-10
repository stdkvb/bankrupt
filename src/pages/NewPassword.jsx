import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, TextField } from "@mui/material";

import api from "../utils/Api";

const NewPassword = () => {
  const navigate = useNavigate();
  //get params from url
  const [urlParams, setUrlParams] = useSearchParams();
  let userId = urlParams.get("user_id");
  let checkword = urlParams.get("checkword");
  //query errors
  const [errors, setErrors] = useState([]);

  //input value
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordValidator = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordErrorError] = useState(false);
  const confirmPasswordValidator = (e) => {
    const { name, value } = e.target;
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordErrorError(true);
    } else {
      setConfirmPasswordErrorError(false);
    }
  };

  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .newPassword(userId, password, checkword)
      .then((data) => {
        if (data.status === "success") {
          navigate("/");
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}
      >
        Сменить пароль
      </Typography>
      <TextField
        label="Придумайте новый пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="password"
        name="password"
        error={passwordError}
        helperText={
          passwordError ? "Пароль должен содержать минимум 6 символов" : ""
        }
        value={password}
        onChange={passwordValidator}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Повторите новый пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        error={confirmPasswordError}
        helperText={confirmPasswordError ? "Введенные пароли не совпадают" : ""}
        value={confirmPassword}
        onChange={confirmPasswordValidator}
        sx={{ mb: 2 }}
      />
      {errors.map((error, i) => {
        return (
          <Typography color="error.main" sx={{ my: 2 }} key={i}>
            {error.message}
          </Typography>
        );
      })}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={!password || passwordError || confirmPasswordError}
      >
        Восстановить пароль
      </Button>
    </Box>
  );
};

export default NewPassword;
