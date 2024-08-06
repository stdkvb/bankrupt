import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import TextInput from "../components/TextInput";
import Popup from "../components/Popup";
import api from "../utils/Api";

const changePasswordInputs = [
  { label: "Текущий пароль", name: "oldPwd" },
  { label: "Новый пароль", name: "newPwd" },
  { label: "Повторите пароль", name: "confirmPassword" },
];

const ChangePassword = () => {
  //query errors
  const [errors, setErrors] = useState([]);
  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  //input value
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordValidator = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const newPasswordValidator = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value.length < 6) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordErrorError] = useState(false);
  const confirmPasswordValidator = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setConfirmPasswordErrorError(true);
    } else {
      setConfirmPasswordErrorError(false);
    }
  };

  //form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    api
      .changePassword(password, newPassword)
      .then((data) => {
        if (data.status === "success") {
          setErrors([]);
          setIsSuccess(true);
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {" "}
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
            <TextField
              label="Текущий пароль"
              variant="standard"
              size="medium"
              required
              fullWidth
              id="oldPwd"
              name="oldPwd"
              error={passwordError}
              helperText={passwordError ? "Введите текущий пароль" : ""}
              value={password}
              onChange={passwordValidator}
              sx={{ width: { xs: "100%", md: "300px" } }}
            />
            <TextField
              label="Новый пароль"
              variant="standard"
              size="medium"
              required
              fullWidth
              id="newPwd"
              name="newPwd"
              error={newPasswordError}
              helperText={
                newPasswordError
                  ? "Пароль должен содержать минимум 6 символов"
                  : ""
              }
              value={newPassword}
              onChange={newPasswordValidator}
              sx={{ width: { xs: "100%", md: "300px" } }}
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
              helperText={
                confirmPasswordError ? "Введенные пароли не совпадают" : ""
              }
              value={confirmPassword}
              onChange={confirmPasswordValidator}
              sx={{ width: { xs: "100%", md: "300px" } }}
            />
          </Stack>
          {errors.map((error, i) => {
            return (
              <Typography color="error.main" sx={{ my: 2 }} key={i}>
                {error.message}
              </Typography>
            );
          })}
          <Button
            type="submit"
            variant="contained"
            sx={{ width: { xs: "100%", md: "300px" } }}
            disabled={
              !password ||
              passwordError ||
              newPasswordError ||
              confirmPasswordError ||
              newPassword !== confirmPassword
            }
          >
            Сохранить
          </Button>
        </Paper>
      </Container>
      <Popup
        isPopupOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
        }}
      >
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
          Пароль изменен
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default ChangePassword;
