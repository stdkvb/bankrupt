import React from "react";
import { Paper, Typography, Stack, Link, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const WikiFilters = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      login: data.get("login"),
      password: data.get("password"),
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: [2], md: [4] },
      }}
    >
      <Stack
        sx={{
          mb: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: [4],
        }}
      >
        <TextField
          label="Название документа"
          variant="standard"
          size="medium"
          id="surname"
          name="surname"
          InputLabelProps={{ shrink: true }}
          sx={{ gridColumn: { xs: "unset", xl: "span 2" } }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Дата"
            sx={{ width: "100%" }}
            slotProps={{
              textField: {
                variant: "standard",
                InputLabelProps: { shrink: true },
                size: "medium",
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          type="reset"
          variant="outlined"
          sx={{ width: { xs: "100%", md: "100px" } }}
        >
          Сбросить
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: { xs: "100%", md: "180px" } }}
        >
          Найти
        </Button>
      </Stack>
    </Paper>
  );
};

export default WikiFilters;
