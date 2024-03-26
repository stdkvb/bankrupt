import { Typography, Button, Stack } from "@mui/material";
import Container from "@mui/material/Container";

import Tariff from "../components/Tariff";
import PersonalData from "../components/PersonalData";
import Requisites from "../components/Requisites";
import Questions from "../components/Questions";
import Notification from "../components/Notification";

const Profile = () => {
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
      </Tariff>
      <PersonalData />
      <Questions />
    </Container>
  );
};

export default Profile;
