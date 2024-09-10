import { useContext } from "react";
import { Typography, Button, Stack, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { UserContext } from "../utils/UserContext";
import Trial from "../components/Trial";
import Rate from "../components/Rate";
import PersonalData from "../components/PersonalData";
import Questions from "../components/Questions";

const Profile = ({ updateUser }) => {
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
      <Rate data={user && user.currentTarif}>
        {user &&
          user.currentTarif &&
          (user.currentTarif.id == 121 || user.currentTarif.demoAccess) && (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: [4],
                rowGap: { xs: [1], md: [2] },
                flexWrap: "wrap",
              }}
            >
              {user && user.currentTarif && user.currentTarif.id == 121 && (
                <Button
                  component={RouterLink}
                  to="/rates"
                  variant="contained"
                  sx={{ minWidth: { xs: "100%", md: "300px" } }}
                >
                  Оплатить тариф
                </Button>
              )}
              {user && user.currentTarif && user.currentTarif.demoAccess && (
                <Trial />
              )}
            </Stack>
          )}
      </Rate>
      <PersonalData updateUser={updateUser} />
      <Questions />
    </Container>
  );
};

export default Profile;
