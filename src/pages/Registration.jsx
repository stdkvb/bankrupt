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
    firstName: "",
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

  const [lastNameError, setLastNameError] = useState(false);
  const lastNameValidator = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (e.target.validity.valid) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
  };

  const [firstNameError, setFirstNameError] = useState(false);
  const firstNameValidator = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (e.target.validity.valid) {
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
    }
  };

  const [emailError, setEmailError] = useState(false);
  const emailValidator = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (
      !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(e.target.value)
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const [phoneError, setPhoneError] = useState(false);
  const phoneValidator = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (e.target.validity.valid) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const [passwordError, setPasswordError] = useState(false);
  const passwordValidator = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (e.target.value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const [confirmPasswordError, setConfirmPasswordErrorError] = useState(false);
  const confirmPasswordValidator = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (e.target.value !== formValue.password) {
      setConfirmPasswordErrorError(true);
    } else {
      setConfirmPasswordErrorError(false);
    }
  };

  const [policyError, setPolicyError] = useState(false);
  const policyValidator = (e) => {
    if (e.target.validity.valid) {
      setPolicyError(false);
    } else {
      setPolicyError(true);
    }
  };

  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();
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
              подтверждения регистрации, пожалуйста, пройдите по ссылке в
              письме.
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
            error={lastNameError}
            helperText={lastNameError ? "Введите фамилию" : ""}
            value={formValue.lastName}
            onChange={lastNameValidator}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Имя"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="firstName"
            name="firstName"
            error={firstNameError}
            helperText={firstNameError ? "Введите имя" : ""}
            value={formValue.firstName}
            onChange={firstNameValidator}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Отчество"
            variant="standard"
            size="medium"
            fullWidth
            id="secondName"
            name="secondName"
            value={formValue.secondName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <InputMask
            mask="+7 (999) 999 99 99"
            value={formValue.phone}
            onChange={phoneValidator}
          >
            <TextField
              label="Телефон"
              variant="standard"
              size="medium"
              required
              fullWidth
              id="phone"
              name="phone"
              error={phoneError}
              helperText={phoneError ? "Введите телефон" : ""}
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
            error={emailError}
            helperText={emailError ? "Email не корректный" : ""}
            value={formValue.email}
            onChange={emailValidator}
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
            error={passwordError}
            helperText={
              passwordError ? "Пароль должен содержать минимум 6 символов" : ""
            }
            value={formValue.password}
            onChange={passwordValidator}
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
            error={confirmPasswordError}
            helperText={
              confirmPasswordError ? "Введенные пароли не совпадают" : ""
            }
            value={formValue.confirmPassword}
            onChange={confirmPasswordValidator}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="policy"
                defaultChecked
                required
                onChange={policyValidator}
              />
            }
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={
              !(
                formValue.lastName &&
                formValue.firstName &&
                formValue.email &&
                formValue.phone &&
                formValue.password &&
                formValue.confirmPassword &&
                !lastNameError &&
                !firstNameError &&
                !phoneError &&
                !emailError &&
                !passwordError &&
                !confirmPasswordError &&
                !policyError
              )
            }
          >
            Зарегистрироваться
          </Button>
        </Box>
      )}
    </>
  );
};

export default Registration;
