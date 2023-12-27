import React from "react";
import { Paper, Typography, Stack, Link, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Notification from "../components/Notification";
import Tariff from "../components/Tariff";
import Trial from "../components/Trial";

const rates = [
  {
    name: "Базовый",
    version: "Электронная версия",
    description: [
      "Печатная версия журнала",
      "Доступ к Базе знаний",
      "Доступ к закрытому телеграмм каналу",
    ],
    prices: [
      { duration: "1 день", price: "500" },
      { duration: "1 месяц", price: "980" },
      { duration: "6 месяцев", price: "17980" },
      { duration: "12 месяцев", price: "34980" },
    ],
  },
  {
    name: "Комбинированный",
    version: "Электронная версия + Печатная версия",
    description: [
      "Печатная версия журнала",
      "Доступ к Базе знаний",
      "Доступ к закрытому телеграмм каналу",
      "Доступ к Базе знаний",
      "Печатная версия журнала",
    ],
    prices: [
      { duration: "1 месяц", price: "980" },
      { duration: "6 месяцев", price: "17980" },
      { duration: "12 месяцев", price: "34980" },
    ],
  },
  {
    name: "Классический",
    version: "Печатная версия",
    description: [
      "Печатная версия журнала",
      "Доступ к Базе знаний",
      "Доступ к закрытому телеграмм каналу",
    ],
    prices: [
      { duration: "1 месяц", price: "980" },
      { duration: "6 месяцев", price: "17980" },
      { duration: "12 месяцев", price: "34980" },
    ],
  },
];

const Rates = () => {
  console.log(rates);
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
      <Typography variant="h4" component="h1">
        Каталог
      </Typography>
      <Notification />
      <Tariff />
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, 1fr)",
            sxl: "repeat(3, 1fr)",
          },
          gap: 3,
          justifyContent: "start",
        }}
      >
        {rates.map((rate, i) => {
          return (
            <Paper
              key={i}
              elevation={0}
              sx={{
                p: { xs: [2], md: [4] },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Stack>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {rate.name}
                </Typography>
                <Typography variant="p" sx={{ mb: 2 }}>
                  {rate.version}
                </Typography>
                <ul>
                  {rate.description.map((row, i) => {
                    return (
                      <li key={i}>
                        <Typography variant="p">{row}</Typography>
                      </li>
                    );
                  })}
                </ul>
              </Stack>
              <Stack sx={{ minHeight: "265px" }}>
                <FormControl sx={{ mb: 4 }}>
                  <Typography variant="p">Срок действия подписки</Typography>
                  <RadioGroup>
                    {rate.prices.map((price, i) => {
                      return (
                        <FormControlLabel
                          key={i}
                          value={price.duration}
                          control={<Radio />}
                          label={
                            <Stack
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: { xs: 0, md: 2 },
                                textAlign: "right",
                              }}
                            >
                              <Typography
                                sx={{ flexGrow: "1", textAlign: "left" }}
                              >
                                {price.duration}
                              </Typography>
                              <Stack
                                sx={{
                                  justifyContent: "space-between",
                                  flexDirection: {
                                    xs: "column-reverse",
                                    md: "row",
                                  },
                                  gap: { xs: 0, md: 2 },
                                }}
                              >
                                <Typography color="text.secondary">
                                  Экономия 4 980 ₽
                                </Typography>
                                <Typography>{price.price} ₽</Typography>
                              </Stack>
                            </Stack>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <Button variant="contained" sx={{ mt: "auto" }}>
                  Оплатить
                </Button>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
      <Trial />
    </Container>
  );
};

export default Rates;
