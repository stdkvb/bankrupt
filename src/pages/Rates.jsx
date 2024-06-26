import { useEffect, useState, useContext } from "react";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Alert,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Rate from "../components/Rate";
import Trial from "../components/Trial";
import { UserContext } from "../utils/UserContext";
import api from "../utils/Api";

const Rates = () => {
  const user = useContext(UserContext).user;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getRates = () => {
    api
      .getRates()
      .then((data) => {
        if (data.status === "success") {
          setData(data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getRates, []);

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
        Тарифы
      </Typography>
      {data && data.notification.message && (
        <Alert variant="filled" severity={data.notification.type}>
          <Typography>{data.notification.message}</Typography>
        </Alert>
      )}
      <Rate data={data && data.currentTarif} />
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
        {!loading &&
          data.list.map((rate, i) => {
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
                    {rate.title}
                  </Typography>
                  <Typography variant="p" sx={{ mb: 2 }}>
                    {rate.subtitle}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ mb: 2 }}
                    dangerouslySetInnerHTML={{
                      __html: rate.description,
                    }}
                  ></Typography>
                </Stack>
                <Stack sx={{ minHeight: "265px" }}>
                  <FormControl sx={{ mb: 4 }}>
                    <Typography variant="p">Срок действия подписки</Typography>
                    <RadioGroup>
                      {Object.entries(rate.price).map((price, i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            value={price[1].value}
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
                                  duration
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
                                    {price[1].description}
                                  </Typography>
                                  <Typography>{price[1].value}</Typography>
                                </Stack>
                              </Stack>
                            }
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <Button variant="contained" sx={{ mt: "auto" }} disabled>
                    Оплатить
                  </Button>
                </Stack>
              </Paper>
            );
          })}
      </Stack>
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Демо-доступ
        </Typography>
        <Typography variant="p" color="text.secondary" sx={{ mb: 2 }}>
          Активируйте бесплатный демо-доступ, чтобы протестировать возможности
          сервиса в течении 3-х дней
        </Typography>
        <Trial />
      </Paper>
    </Container>
  );
};

export default Rates;
