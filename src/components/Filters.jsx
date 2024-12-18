import { useState, useContext } from "react";
import { Paper, Stack, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { FiltersContext } from "../utils/FiltersContext";
import { PaginationContext } from "../utils/PaginationContext";
import Select from "./Select";

const Filters = ({ data, short }) => {
  const { filters, setFilters } = useContext(FiltersContext);
  const { page, setPage } = useContext(PaginationContext);

  //select filters
  const [filterParamsList, setFilterParamsList] = useState(
    !short && data.filterParamsList
  );

  //tags filters clear
  const [filtersClear, setFiltersClear] = useState(false);

  //date picker clear
  const [openDateFrom, setOpenDateFrom] = useState(false);
  const [openDateTo, setOpenDateTo] = useState(false);
  const [dateFromValue, setDateFromValue] = useState(null);
  const [dateToValue, setDateToValue] = useState(null);

  const handleResetFilters = () => {
    setFiltersClear(!filtersClear);
    setDateFromValue(null);
    setDateToValue(null);
    setPage(1);
    setFilters([]);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const formData = Array.from(new FormData(event.currentTarget));
    // меняет запятую на 鰷. нужно чтобы на бэке строка корректно делилась на массив по запятой
    const commaTo𡬈 = formData.map((item) => {
      const [title, value] = item;
      const newStringWith𡬈 = value.replaceAll(",", "𡬈");
      const newStringWith鰷 = newStringWith𡬈.replaceAll("鰷", ",");
      return [title, newStringWith鰷];
    });

    setPage(1);
    setFilters(commaTo𡬈);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleFilterSubmit}
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
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
            localeText={
              ruRU.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DatePicker
              open={openDateFrom}
              onOpen={() => setOpenDateFrom(true)}
              onClose={() => setOpenDateFrom(false)}
              value={dateFromValue}
              onChange={(newValue) => {
                setDateFromValue(newValue);
              }}
              label="Дата"
              name="date"
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputLabelProps: { shrink: true },
                  size: "small",
                  onFocus: (event) => event.target.blur(),
                  onClick: (e) => setOpenDateFrom(true),
                },
                field: { clearable: true },
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
          {filterParamsList &&
            filterParamsList.map((filter, i) => {
              return (
                <Select
                  key={i}
                  name={filter.name}
                  title={filter.title}
                  tags={filter.values}
                  onReset={filtersClear}
                  addSpecilaSing
                />
              );
            })}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
            localeText={
              ruRU.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DatePicker
              open={openDateFrom}
              onOpen={() => setOpenDateFrom(true)}
              onClose={() => setOpenDateFrom(false)}
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
                  inputProps: { readOnly: true, tabIndex: -1 },
                  onFocus: (event) => event.target.blur(),
                  onClick: (e) => setOpenDateFrom(true),
                },
                field: { clearable: true },
              }}
            />
            <DatePicker
              open={openDateTo}
              onOpen={() => setOpenDateTo(true)}
              onClose={() => setOpenDateTo(false)}
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
                  inputProps: { readOnly: true, tabIndex: -1 },
                  onFocus: (event) => event.target.blur(),
                  onClick: (e) => setOpenDateTo(true),
                },
                field: { clearable: true },
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
