import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: "100%",
        pt: { xs: "40px", md: "0" },
        pb: { xs: "16px", md: "26px" },
      }}
      color="text.secondary"
    >
      <Typography>
        Техническая поддержка:{" "}
        <Link href="mailto:info@example.ru">info@example.ru</Link>
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>Разработка</Typography>
        <Typography>–</Typography>
        <Typography display="inline">
          <Link href="https://wptt.ru/" target="_blank">
            Вебпространство
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
