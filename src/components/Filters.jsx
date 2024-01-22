import React from "react";
import { Paper, Typography, Stack, Link, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Select from "./Select";

const data = {
  status: "success",
  data: {
    filterParamsList: [
      {
        title: "Участники дела",
        values: ["Участник 1", "Участник 2", "Участник 3"],
      },
      {
        title: "Суть спора",
        values: ["Суть спора 1", "Суть спора 2", "Суть спора 3"],
      },
      {
        title: "Суд",
        values: ["Суд 1", "Суд 2", "Суд 3"],
      },
      {
        title: "Территориальная принадлежность",
        values: ["Принадлежность 1", "Принадлежность 2", "Принадлежность 3"],
      },
    ],
    documentsList: [
      {
        id: 3,
        title: "третий",
        date: "01.01.2024",
        caseNumber: "",
        subtitle: "от 01.01.2024",
        previewText: "описание третьего",
        detailText: "детальное описание третьего",
        tags: ["Участник 1", "Суть спора 1", "Суд 1", "Принадлежность 1"],
        acts: [
          {
            title: null,
            url: "https://bankrotvestnik.ru",
          },
        ],
        file: [],
      },
      {
        id: 1,
        title: "Первый документ1",
        date: "07.12.2023",
        caseNumber: "1234-вс",
        subtitle: "от 07.12.2023 по делу №1234-вс",
        previewText: "Описание для анонса ...",
        detailText: "Детальное описание ...",
        tags: [
          "Участник 1",
          "Участник 2",
          "Суть спора 2",
          "Суть спора 3",
          "Суд 1",
          "Суд 3",
          "Принадлежность 1",
          "Принадлежность 2",
        ],
        acts: [
          {
            title: "Capture001.png",
            url: "https://bankrotvestnik.ru/upload/iblock/23f/r9a71hxm1r7b56gqul742a5fnzqj3m6p.png",
          },
          {
            title: "photo_2023-12-13_17-45-45.jpg",
            url: "https://bankrotvestnik.ru/upload/iblock/01b/22847ll53xkvboynftx77nyrmbijlver.jpg",
          },
        ],
        file: {
          title: "2254e1fd4e79f9bcc2e85f127feebb51.pdf",
          url: "https://bankrotvestnik.ru/upload/iblock/805/ty936c5lanxb3y92emanxodcrhars9n9.pdf",
        },
      },
      {
        id: 2,
        title: "второй документ",
        date: "07.12.2023",
        caseNumber: "1234-вс",
        subtitle: "от 07.12.2023 по делу №1234-вс",
        previewText: "Описание для анонса ...",
        detailText: "Детальное описание ...",
        tags: [
          "Участник 1",
          "Суть спора 2",
          "Суть спора 3",
          "Суд 1",
          "Суд 3",
          "Принадлежность 1",
          "Принадлежность 3",
        ],
        acts: [
          {
            title: null,
            url: "https://bankrotvestnik.ru",
          },
        ],
        file: {
          title: "2254e1fd4e79f9bcc2e85f127feebb51.pdf",
          url: "https://bankrotvestnik.ru/upload/iblock/805/ty936c5lanxb3y92emanxodcrhars9n9.pdf",
        },
      },
      {
        id: 4,
        title: "четрвертый",
        date: "",
        caseNumber: "",
        subtitle: "",
        previewText: "описание документа",
        detailText: "детальное описание документа",
        tags: [],
        acts: [
          {
            title: null,
            url: "https://bankrotvestnik.ru",
          },
        ],
        file: {
          title: "2254e1fd4e79f9bcc2e85f127feebb51.pdf",
          url: "https://bankrotvestnik.ru/upload/iblock/805/ty936c5lanxb3y92emanxodcrhars9n9.pdf",
        },
      },
    ],
    isNextPage: false,
  },
  errors: [],
};

const Filters = () => {
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
        {data.data.filterParamsList.map((filter, i) => {
          return <Select key={i} title={filter.title} tags={filter.values} />;
        })}

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
        <TextField
          label="Поиск"
          variant="standard"
          size="medium"
          id="surname"
          name="surname"
          InputLabelProps={{ shrink: true }}
          sx={{ gridColumn: { xs: "unset", xl: "span 2" } }}
        />
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

export default Filters;
