import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Requisites from "../components/Requisites";
import TextInput from "./TextInput";
import { UserContext } from "../utils/context";

import api from "../utils/Api";
import Popup from "../components/Popup";

const PersonalData = () => {
  //current user
  const user = useContext(UserContext).user;
  const [isLegalEntity, setIsLegalEntity] = useState(user.legalEntity);
  const [readOnly, setIsReadOnly] = useState(true);

  const personalInputs = [
    { label: "Фамилия", name: "lastName", defaultValue: `${user.lastName}` },
    { label: "Имя", name: "firstName", defaultValue: `${user.firstName}` },
    {
      label: "Отчество",
      name: "secondName",
      defaultValue: `${user.secondName}`,
    },
    { label: "Телефон", name: "phone", defaultValue: `${user.phone}` },
    { label: "Email", name: "email", defaultValue: `${user.email}` },
  ];

  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  //form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    api
      .changeUser(formData)
      .then((data) => {
        if (data.status === "success") {
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsReadOnly(true);
  };

  return (
    <>
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
        <Typography variant="h5">Личные данные</Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: [4],
            rowGap: [2],
            flexWrap: "wrap",
          }}
        >
          {personalInputs.map((input, i) => (
            <TextInput
              key={i}
              label={input.label}
              name={input.name}
              defaultValue={input.defaultValue}
              required={true}
              multiline={false}
              readOnly={readOnly}
            />
          ))}
        </Stack>
        <FormControlLabel
          sx={{ width: "fit-content" }}
          control={
            <Checkbox
              value="corporate"
              onChange={() => {
                setIsLegalEntity(!isLegalEntity);
              }}
              disabled={readOnly}
              checked={isLegalEntity}
            />
          }
          label={
            <Typography display="inline" color="text.secondary">
              Юридическое лицо
            </Typography>
          }
        />
        {isLegalEntity && <Requisites readOnly={readOnly} />}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: [4],
            rowGap: { xs: [1], md: [2] },
            flexWrap: "wrap",
          }}
        >
          <Button
            type={readOnly ? "button" : "submit"}
            variant="contained"
            sx={{ minWidth: { xs: "100%", md: "300px" } }}
            onClick={(e) => {
              if (readOnly) {
                e.preventDefault();
                setIsReadOnly(false);
              }
            }}
          >
            {readOnly ? "Редактировать" : "Сохранить"}
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: { xs: "100%", md: "300px" } }}
            component={RouterLink}
            to={"/change-password"}
            disabled={!readOnly}
          >
            Сменить пароль
          </Button>
        </Stack>
      </Paper>
      <Popup isPopupOpen={isSuccess}>
        <IconButton
          onClick={() => {
            setIsSuccess(false);
            // updateFavorites();
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
          Профиль иземенён
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSuccess(false);
            // updateFavorites();
          }}
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default PersonalData;
