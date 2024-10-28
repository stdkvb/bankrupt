import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Stack,
  Link,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";

import api from "../utils/Api";
import Questions from "../components/Questions";

const Contacts = ({ handleLogout }) => {
  const [contacts, setContacts] = useState();
  const [loading, setLoading] = useState(true);

  const getContacts = () => {
    api
      .getContacts()
      .then((data) => {
        if (data.status === "success") {
          setContacts(data.data);
        } else {
          handleLogout();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getContacts, []);

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
        Контакты
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
          position: "relative",
          minHeight: "216px",
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
          contacts && (
            <>
              <Grid container rowSpacing={{ xs: 3, md: 2 }} columnSpacing={8}>
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "column", gap: [1] }}
                >
                  <Typography variant="p">Телефон:</Typography>
                  <Link href={`tel:${contacts.phone}`} variant="h5">
                    {contacts.phone}
                  </Link>
                </Grid>
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "column", gap: [1] }}
                >
                  <Typography variant="p">Электронная почта:</Typography>
                  <Link href={`mailto:${contacts.email}`} variant="h5">
                    {contacts.email}
                  </Link>
                </Grid>
              </Grid>
              <Stack>
                <Typography variant="p">Почтовый адрес:</Typography>
                <Typography variant="h5">{contacts.address}</Typography>
              </Stack>
              <Link
                // href={contacts.userAgreement}
                href="/Пользовательское соглашение+++.pdf"
                download
                target="_blank"
                color="primary.main"
              >
                Пользовательское соглашение
              </Link>
              <Link
                // href={contacts.map}
                href="/Карта партнера.pdf"
                download
                target="_blank"
                color="primary.main"
                sx={{ mt: -3 }}
              >
                {" "}
                Карта партнера
              </Link>
            </>
          )
        )}
      </Paper>
      <Questions />
    </Container>
  );
};

export default Contacts;
