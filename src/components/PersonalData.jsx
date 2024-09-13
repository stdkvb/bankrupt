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
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Requisites from "../components/Requisites";
import TextInput from "./TextInput";
import { UserContext } from "../utils/UserContext";

import api from "../utils/Api";
import Popup from "../components/Popup";

const PersonalData = ({ updateUser }) => {
  //current user
  const user = useContext(UserContext).user.personal;

  const [isLegalEntity, setIsLegalEntity] = useState(user && user.legalEntity);
  const [readOnly, setIsReadOnly] = useState(true);

  const fields = [
    {
      label: "Фамилия",
      name: "lastName",
      defaultValue: `${user && user.lastName}`,
    },
    {
      label: "Имя",
      name: "name",
      defaultValue: `${user && user.firstName}`,
    },
    {
      label: "Отчество",
      name: "secondName",
      defaultValue: `${user && user.secondName}`,
    },
    { label: "Телефон", name: "phone", defaultValue: `${user && user.phone}` },
    { label: "Email", name: "email", defaultValue: `${user && user.email}` },
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
          updateUser();
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
        <Grid container rowGap={2} columnGap={4}>
          {fields.map((input, i) => (
            <Grid item xs={12} md={12} lg={5} xl={3} key={i}>
              <TextInput
                label={input.label}
                name={input.name}
                defaultValue={user && input.defaultValue}
                required={true}
                multiline={false}
                readOnly={readOnly}
              />
            </Grid>
          ))}
        </Grid>
        <input type="hidden" name="legalEntity" value="false" />
        <FormControlLabel
          sx={{ width: "fit-content" }}
          control={
            <Checkbox
              name="legalEntity"
              value="true"
              onChange={() => {
                setIsLegalEntity(!isLegalEntity);
              }}
              disabled={readOnly}
              checked={isLegalEntity}
              inputProps={{ "aria-label": "controlled" }}
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
      <Popup
        isPopupOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          // updateFavorites();
        }}
      >
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
          Профиль изменён
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
