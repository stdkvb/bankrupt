import React from "react";
import { Typography, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

const Requisites = () => {
  return (
    <>
      <Typography variant="h5">Реквизиты</Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: [4],
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Юридическое наименование"
          required
          variant="standard"
          size="medium"
          id="company"
          name="company"
          InputLabelProps={{ shrink: true }}
          value="Company"
          sx={{ width: { xs: "100%", md: "300px" } }}
        />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: [4],
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Расчетный счет"
          required
          variant="standard"
          size="medium"
          id="checkingAccount"
          name="checkingAccount"
          InputLabelProps={{ shrink: true }}
          value="123456"
          sx={{ width: { xs: "100%", md: "300px" } }}
        />
      </Stack>
    </>
  );
};

export default Requisites;
