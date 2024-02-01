import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";

const NewPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      login: data.get("login"),
      password: data.get("password"),
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
        label="Новый пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="password"
        name="password"
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
        sx={{ mb: 2 }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Восстановить пароль
      </Button>
    </Box>
  );
};

export default NewPassword;
