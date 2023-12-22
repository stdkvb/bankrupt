import React from "react";
import { Paper, Typography, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Questions from "../components/Questions";

const Contacts = () => {
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
        }}
      >
        <Grid container rowSpacing={{ xs: 3, md: 2 }} columnSpacing={8}>
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Телефон:</Typography>
            <Link href="telto:88000000000" variant="h5">
              8 (000) 000-00-00
            </Link>
          </Grid>
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Электронная почта:</Typography>
            <Link href="mailto:info@example.com" variant="h5">
              info@example.com
            </Link>
          </Grid>
        </Grid>
        <Stack>
          <Typography variant="p">Почтовый адрес:</Typography>
          <Typography variant="h5">
            344047, г. Ростов-на-Дону, ул. Еременко, 108, стр. 2, кв. 73
          </Typography>
        </Stack>
      </Paper>
      <Questions />
    </Container>
  );
};

export default Contacts;
