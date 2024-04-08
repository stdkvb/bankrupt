import { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import Tariff from "../components/Tariff";
import Trial from "../components/Trial";
import { UserContext } from "../utils/context";
import api from "../utils/Api";

const Rates = () => {
  //current user
  const user = useContext(UserContext).user;
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  //get rates
  const getRates = () => {
    api
      .getRates()
      .then((data) => {
        if (data.status === "success") {
          setRates(data.data);
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
      {user.notification && (
        <Alert variant="filled" severity={user.notification.type}>
          <Typography>{user.notification.message}</Typography>
          <Typography
            component={RouterLink}
            to="/rates"
            color="text.white"
            sx={{ fontSize: "14px" }}
          >
            Обновите подписку
          </Typography>
        </Alert>
      )}
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
        {loading ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          />
        ) : (
          rates.map((rate, i) => {
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
                  <Button variant="contained" sx={{ mt: "auto" }}>
                    Оплатить
                  </Button>
                </Stack>
              </Paper>
            );
          })
        )}
      </Stack>
      <Trial />
    </Container>
  );
};

export default Rates;
