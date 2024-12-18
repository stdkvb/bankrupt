import React from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const Rate = ({ data, children }) => {
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
        {data && data.name && (
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Тариф</Typography>
            <Typography variant="h5">{data && data.name}</Typography>
          </Grid>
        )}
        {data && data.status && (
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Статус</Typography>
            <Typography variant="h5" color="primary.main">
              {data.status}
            </Typography>
          </Grid>
        )}
        {data && data.endDate && (
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", gap: [1] }}
          >
            <Typography variant="p">Дата окончания</Typography>
            <Typography variant="h5">{data.endDate}</Typography>
          </Grid>
        )}
      </Grid>
      {children}
    </Paper>
  );
};

export default Rate;
