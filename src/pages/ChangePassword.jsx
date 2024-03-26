import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
} from "@mui/material";

import TextInput from "../components/TextInput";

const changePasswordInputs = [
  { label: "Текущий пароль", name: "password" },
  { label: "Новый пароль", name: "newPassword" },
  { label: "Повторите пароль", name: "confirmPassword" },
];

const ChangePassword = () => {
  //form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("submit");
    setIsReadOnly(true);
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: { xs: [2], md: [4] },
      }}
    >
      <Typography variant="h5" component="h1">
        Сменить пароль
      </Typography>
      <Paper
        component="form"
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
        }}
        onSubmit={handleFormSubmit}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: [4],
            rowGap: [2],
            flexWrap: "wrap",
          }}
        >
          {changePasswordInputs.map((input, i) => (
            <TextInput
              key={i}
              label={input.label}
              name={input.name}
              defaultValue={""}
              required={true}
              multiline={false}
              readOnly={false}
            />
          ))}
        </Stack>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: { xs: "100%", md: "300px" } }}
        >
          Сохранить
        </Button>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
