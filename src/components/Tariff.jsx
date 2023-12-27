import React from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

const Tariff = ({ children }) => {
  return (
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
        <Grid item sx={{ display: "flex", flexDirection: "column", gap: [1] }}>
          <Typography variant="p">Тариф</Typography>
          <Typography variant="h5">Комбинированный</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", flexDirection: "column", gap: [1] }}>
          <Typography variant="p">Статус</Typography>
          <Typography variant="h5" color="primary.main">
            Демо-доступ
          </Typography>
        </Grid>
        <Grid item sx={{ display: "flex", flexDirection: "column", gap: [1] }}>
          <Typography variant="p">Дата окончания</Typography>
          <Typography variant="h5">20 декабря 2023</Typography>
        </Grid>
      </Grid>
      {children}
    </Paper>
  );
};

export default Tariff;
