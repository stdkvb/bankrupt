import React from "react";
import { Paper, Typography, Button, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputMask from "react-input-mask";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Requisites from "../components/Requisites";
import Questions from "../components/Questions";
import Notification from "../components/Notification";

const Profile = () => {
  const [isCorporate, setIsCorporate] = React.useState(false);

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
        Профиль
      </Typography>
      <Notification />
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
        }}
      >
        <Grid container rowSpacing={{ xs: 3, md: 2 }} columnSpacing={8}>
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Тариф</Typography>
            <Typography variant="h5">Комбинированный</Typography>
          </Grid>
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Статус</Typography>
            <Typography variant="h5" color="primary.main">
              Демо-доступ
            </Typography>
          </Grid>
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Дата окончания</Typography>
            <Typography variant="h5">20 декабря 2023</Typography>
          </Grid>
        </Grid>
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
            type="submit"
            variant="contained"
            sx={{ minWidth: { xs: "100%", md: "200px" } }}
          >
            Оплатить тариф
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{ minWidth: { xs: "100%", md: "200px" } }}
          >
            Активировать демо-доступ
          </Button>
        </Stack>
      </Paper>
      <Paper
        component="form"
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
        }}
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
          <TextField
            label="Фамилия"
            variant="standard"
            size="medium"
            id="surname"
            name="surname"
            InputLabelProps={{ shrink: true }}
            value="Surname"
            sx={{ width: { xs: "100%", md: "300px" } }}
          />
          <TextField
            label="Имя"
            variant="standard"
            size="medium"
            id="name"
            name="name"
            InputLabelProps={{ shrink: true }}
            value="Name"
            sx={{ width: { xs: "100%", md: "300px" } }}
          />
          <TextField
            label="Отчество"
            variant="standard"
            size="medium"
            required
            id="middlename"
            name="middlename"
            InputLabelProps={{ shrink: true }}
            value="Middlename"
            sx={{ width: { xs: "100%", md: "300px" } }}
          />
          <InputMask mask="+7 (999) 999 99 99">
            <TextField
              label="Телефон"
              variant="standard"
              size="medium"
              required
              id="phone"
              name="phone"
              InputLabelProps={{ shrink: true }}
              placeholder="+7 (999) 999 99 99"
              sx={{ width: { xs: "100%", md: "300px" } }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "text.primary",
                    opacity: 1,
                  },
                },
              }}
            />
          </InputMask>
          <TextField
            label="Email"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="email"
            name="email"
            InputLabelProps={{ shrink: true }}
            value="Email"
            sx={{ width: { xs: "100%", md: "300px" } }}
          />
        </Stack>
        <FormControlLabel
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
        {isCorporate && <Requisites />}
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
            type="submit"
            variant="contained"
            sx={{ minWidth: { xs: "100%", md: "200px" } }}
          >
            Редактировать
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: { xs: "100%", md: "200px" } }}
          >
            Сменить пароль
          </Button>
        </Stack>
      </Paper>
      <Questions />
    </Container>
  );
};

export default Profile;
