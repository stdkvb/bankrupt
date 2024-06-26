import { useContext } from "react";
import { Typography, Button, Stack, Container, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { UserContext } from "../utils/UserContext";
import Trial from "../components/Trial";
import Rate from "../components/Rate";
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
      {user.notification.message && (
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
      <Rate data={user.currentTarif}>
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
            disabled
          >
            Оплатить тариф
          </Button>
          <Trial />
        </Stack>
      </Rate>
      <PersonalData />
      <Questions />
    </Container>
  );
};

export default Profile;
