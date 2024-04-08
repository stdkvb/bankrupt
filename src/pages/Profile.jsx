import { useContext } from "react";
import { Typography, Button, Stack, Container, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { UserContext } from "../utils/context";
import Tariff from "../components/Tariff";
import PersonalData from "../components/PersonalData";
import Questions from "../components/Questions";

const Profile = () => {
  //current user
  const user = useContext(UserContext).user;

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

      <Tariff>
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
            sx={{ minWidth: { xs: "100%", md: "300px" } }}
          >
            Оплатить тариф
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{ minWidth: { xs: "100%", md: "300px" } }}
          >
            Активировать демо-доступ
          </Button>
        </Stack>
      </Tariff>
      <PersonalData />
      <Questions />
    </Container>
  );
};

export default Profile;
