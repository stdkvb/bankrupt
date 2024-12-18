import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Rate from "../components/Rate";
import Trial from "../components/Trial";
import api from "../utils/Api";
import Popup from "../components/Popup";
import useCheckTarrifActive from "../hooks/useCheckTarrifActive";
import { UserContext } from "../utils/UserContext";

const Rates = ({ updateUser, handleLogout }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState();
  const user = useContext(UserContext).user;

  //get available rates
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

  //pay start
  const payTariff = (id, period) => {
    if (user && user.personal && user.personal.legalEntity) {
      api
        .requestInvoice(id, period)
        .then((data) => {
          if (data.status === "success") {
            setIsSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .payTariff(id, period)
        .then((data) => {
          if (data.status === "success") {
            window.location.href = data.data.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //confirm payment
  if (paymentId) {
    const url = new URL(window.location.href);
    url.search = "";

    useEffect(() => {
      api
        .confirmPayment(paymentId)
        .then((data) => {
          if (data.status === "success") {
            updateUser();
            getRates();
            setIsSuccess(true);
            setPaymentStatus(data.data.status);
            window.history.replaceState(null, "", url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [paymentId]);
  }

  const isTariffActive = useCheckTarrifActive();

  return (
    <>
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
        <Rate data={user && user.currentTarif} />
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
                      <Typography variant="p">
                        Срок действия подписки
                      </Typography>
                      <RadioGroup
                        onChange={(event) => {
                          // console.log(event.target.value);
                          setPeriod(event.target.value);
                        }}
                      >
                        {Object.entries(rate.price).map(
                          ([key, price], i, arr) => {
                            return (
                              <FormControlLabel
                                key={i}
                                value={key}
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
                                      {price.title}
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
                                        {price.description}
                                      </Typography>
                                      <Typography>{price.value}</Typography>
                                    </Stack>
                                  </Stack>
                                }
                              />
                            );
                          }
                        )}
                      </RadioGroup>
                    </FormControl>
                    <Button
                      variant="contained"
                      sx={{ mt: "auto" }}
                      onClick={() => {
                        if (period) {
                          payTariff(rate.id, period);
                        }
                      }}
                    >
                      {user && user.personal && user.personal.legalEntity
                        ? "Запросить счет"
                        : "Оплатить"}
                    </Button>
                  </Stack>
                </Paper>
              );
            })}
        </Stack>
        {user && user.currentTarif && user.currentTarif.demoAccess && (
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
              Активируйте бесплатный демо-доступ, чтобы протестировать
              возможности сервиса в течении 3-х дней
            </Typography>
            <Trial />
          </Paper>
        )}
      </Container>
      <Popup
        isPopupOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
        }}
      >
        <IconButton
          onClick={() => {
            setIsSuccess(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" mb={3} sx={{ maxWidth: "90%" }}>
          {!paymentId
            ? "Успешно"
            : paymentStatus == "succeeded"
            ? "Спасибо, тариф успешно оплачен!"
            : paymentStatus == "canceled"
            ? "Ошибка, оплата не прошла, попробуйте ещё раз."
            : "Ваш платёж в обработке."}
        </Typography>
        {!paymentId && (
          <Typography color="text.secondary">
            В ближайшее время на вашу электронную почту поступит <br /> счет на
            оплату
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default Rates;
