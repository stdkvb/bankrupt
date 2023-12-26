import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputMask from "react-input-mask";

import api from "../utils/Api";

const Registration = () => {
  //inputs values
  const [formValue, setFormValue] = useState({
    surname: "",
    name: "",
    middleName: "",
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
      const { surname, name, middleName, phone, email, password } = formValue;
      api
        .createUser(surname, name, middleName, phone, email, password)
        .then((response) => {
          try {
            if (response.status === 200) {
              return response.json();
            }
          } catch (e) {
            return e;
          }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: "400px",
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
        <Link href="/login" color="primary.main">
          Войти
        </Link>
      </Typography>
      <TextField
        label="Фамилия"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="surname"
        name="surname"
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
        required
        fullWidth
        id="middleName"
        name="middleName"
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
        control={<Checkbox value="policy" />}
        label={
          <Typography display="inline" color="text.secondary">
            Я соглашаюсь с
            <Link href="#" target="_blank" color="primary.main">
              {" "}
              политикой конфиденциальности
            </Link>
          </Typography>
        }
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Зарегистрироваться
      </Button>
    </Box>
  );
};

export default Registration;
