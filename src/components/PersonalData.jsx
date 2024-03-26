import { useState } from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Requisites from "../components/Requisites";
import TextInput from "./TextInput";

const personalInputs = [
  { label: "Фамилия", name: "surname", defaultValue: "Фамилия" },
  { label: "Имя", name: "name", defaultValue: "Имя" },
  { label: "Отчество", name: "lastname", defaultValue: "Отчество" },
  { label: "Телефон", name: "phone", defaultValue: "+7(999)1234567" },
  { label: "Email", name: "email", defaultValue: "email" },
];

const PersonalData = () => {
  const [isCorporate, setIsCorporate] = useState(false);
  const [readOnly, setIsReadOnly] = useState(true);

  //form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("submit");
    setIsReadOnly(true);
  };

  return (
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
              setIsCorporate(!isCorporate);
            }}
          />
        }
        label={
          <Typography display="inline" color="text.secondary">
            Юридическое лицо
          </Typography>
        }
      />
      {isCorporate && <Requisites readOnly={readOnly} />}
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
          sx={{ width: "180px" }}
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
          sx={{ minWidth: { xs: "100%", md: "200px" } }}
        >
          Сменить пароль
        </Button>
      </Stack>
    </Paper>
  );
};

export default PersonalData;
