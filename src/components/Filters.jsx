import React from "react";
import { useState } from "react";
import { Paper, Stack, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ru";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Select from "./Select";

const Filters = ({ onFilterSubmit, data, short }) => {
  //select filters
  const [filterParamsList, setFilterParamsList] = useState(
    data.filterParamsList
  );

  //tags filters clear
  const [filtersClear, setFiltersClear] = useState(false);

  //date picker clear
  const [dateFromValue, setDateFromValue] = useState(null);
  const [dateToValue, setDateToValue] = useState(null);

  const handleResetFilters = () => {
    setFiltersClear(!filtersClear);
    setDateFromValue(null);
    setDateToValue(null);
    onFilterSubmit();
  };

  return (
    <Paper
      component="form"
      onSubmit={onFilterSubmit}
      elevation={0}
      sx={{
        p: { xs: [2], md: [4] },
      }}
    >
      {short ? (
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
            id="search"
            name="search"
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
      ) : (
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
          {filterParamsList.map((filter, i) => {
            return (
              <Select
                key={i}
                name={filter.name}
                title={filter.title}
                tags={filter.values}
                onReset={filtersClear}
              />
            );
          })}
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker
              value={dateFromValue}
              onChange={(newValue) => {
                setDateFromValue(newValue);
              }}
              label="От даты"
              name="dateFrom"
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputLabelProps: { shrink: true },
                  size: "small",
                },
              }}
            />
            <DatePicker
              value={dateToValue}
              onChange={(newValue) => {
                setDateToValue(newValue);
              }}
              label="До даты"
              name="dateTo"
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputLabelProps: { shrink: true },
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            label="Поиск"
            variant="standard"
            size="small"
            id="search"
            name="search"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: { xs: "unset", xl: "span 2" } }}
            autoComplete="off"
          />
        </Stack>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          type="reset"
          variant="outlined"
          sx={{ width: { xs: "100%", md: "100px", border: "none" } }}
          onClick={handleResetFilters}
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

export default Filters;
