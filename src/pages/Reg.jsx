import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Reg = () => {
  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("login"),
      password: data.get("password"),
    });
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
        <Link href="#" color="primary.main">
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
        autoFocus
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
        autoFocus
        sx={{ mb: 2 }}
      />
      <TextField
        label="Отчество"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="middlename"
        name="middlename"
        autoFocus
        sx={{ mb: 2 }}
      />
      <TextField
        label="Телефон"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="phone"
        name="phone"
        autoFocus
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="email"
        name="email"
        autoFocus
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
        autoFocus
        sx={{ mb: 2 }}
      />
      <TextField
        label="Повторите пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="repeatpassword"
        name="repeatpassword"
        autoFocus
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

export default Reg;
