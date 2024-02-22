import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import api from "../utils/Api";
import Popup from "../components/Popup";

const PasswordRecovery = () => {
  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  //inp values
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const emailValidator = (e) => {
    setEmail(e.target.value);
    if (
      !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(e.target.value)
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .recoveryPassword(email)
      .then((data) => {
        if (data.status === "success") {
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
          Забыли пароль
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
          Уже есть аккаунт?
          <Link component={RouterLink} to="/" color="primary.main">
            Войти
          </Link>
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
          Мы отправим код подтверждения вам на почту
        </Typography>
        <TextField
          label="Email"
          variant="standard"
          size="medium"
          required
          fullWidth
          id="email"
          name="email"
          sx={{ mb: 2 }}
          error={emailError}
          helperText={emailError ? "Введите электронную почту" : ""}
          onChange={emailValidator}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!email || emailError}
        >
          Отправить
        </Button>
      </Box>
      <Popup isPopupOpen={isSuccess}>
        <IconButton
          onClick={() => {
            setIsSuccess(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Успешно
        </Typography>
        <Typography color="text.secondary">
          На указанную электронную почту навправлено письмо, для восстановления
          пароля, пожалуйста, пройдите по ссылке в письме.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSucccess(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default PasswordRecovery;
