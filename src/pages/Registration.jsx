import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link, Stack } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputMask from "react-input-mask";

import CloseIcon from "@mui/icons-material/Close";

import api from "../utils/Api";
import Popup from "../components/Popup";

const Registration = () => {
  //reg confirmation
  const [isRegistered, setIsRegistered] = useState(false);

  //inputs values
  const [formValue, setFormValue] = useState({
    lastName: "",
    name: "",
    secondName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //inputs changes listener
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValue.password === formValue.confirmPassword) {
      const { lastName, firstName, secondName, phone, email, password } =
        formValue;
      console.log({ lastName, firstName, secondName, phone, email, password });
      api
        .createUser(lastName, firstName, secondName, phone, email, password)
        .then((data) => {
          if (data.status === "success") {
            setIsRegistered(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //resend confirmation code
  const [isResent, setIsResent] = useState(false);

  const resendCode = () => {
    api
      .resendCode()
      .then((data) => {
        if (data.status === "success") {
          setIsResent(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isRegistered ? (
        <>
          <Box
            sx={{
              maxWidth: "420px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Подтвердите регистрацию
            </Typography>
            <Typography sx={{ mb: 2, textAlign: "center" }}>
              На указанную электронную почту навправлено письмо, для
              подтверждения регистрации, пожалуйста, пройдите по ссылке.
            </Typography>
            <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <Typography color="text.secondary">Письмо не пришло?</Typography>
              <Link onClick={resendCode} color="primary.main">
                Отправить еще раз
              </Link>
            </Stack>
          </Box>
          <Popup isPopupOpen={isResent}>
            <IconButton
              onClick={() => {
                setIsResent(false);
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
              Письмо повторно отправлено на указанную электронную почту
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
              onClick={() => {
                setIsResent(false);
              }}
            >
              Закрыть
            </Button>
          </Popup>
        </>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            maxWidth: "420px",
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
            Регистрация
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
          >
            Уже есть аккаунт?{" "}
            <Link component={RouterLink} to="/" color="primary.main">
              Войти
            </Link>
          </Typography>
          <TextField
            label="Фамилия"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="lastName"
            name="lastName"
            value={formValue.surname}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Имя"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="name"
            name="name"
            value={formValue.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Отчество"
            variant="standard"
            size="medium"
            fullWidth
            id="secondName"
            name="secondName"
            value={formValue.middleName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <InputMask
            mask="+7 (999) 999 99 99"
            value={formValue.phone}
            onChange={handleChange}
          >
            <TextField
              label="Телефон"
              variant="standard"
              size="medium"
              required
              fullWidth
              id="phone"
              name="phone"
              sx={{ mb: 2 }}
            />
          </InputMask>
          <TextField
            label="Email"
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
            label="Придумайте пароль"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Повторите пароль"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox value="policy" defaultChecked required />}
            label={
              <Typography
                display="inline"
                color="text.secondary"
                fontSize={"15px"}
              >
                Я соглашаюсь с&nbsp;
                <Link
                  component={RouterLink}
                  to="/policy"
                  target="_blank"
                  color="primary.main"
                >
                  политикой конфиденциальности
                </Link>
              </Typography>
            }
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Зарегистрироваться
          </Button>
        </Box>
      )}
    </>
  );
};

export default Registration;
