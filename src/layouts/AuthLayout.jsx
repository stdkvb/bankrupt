import React from "react";
import { Outlet } from "react-router-dom";
import { Container, AppBar, Toolbar, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import logo from "../assets/images/logo.svg";

const AuthLayout = () => {
  return (
    <>
      <AppBar
        sx={{
          position: "unset",
          bgcolor: "white",
          boxShadow: "none",
          paddingTop: { xs: "16px", md: "26px" },
        }}
      >
        <Toolbar>
          <Link
            href="https://банкротный-вестник.рф"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: { md: "126px" } }}
          >
            <Box
              component="img"
              sx={{ height: { xs: "44px", md: "76px" } }}
              alt="Logo"
              src={logo}
            />
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <Box
        component="footer"
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "0", md: "1" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography>Техническая поддержка:&nbsp;</Typography>
          <Link href="mailto:support@bvestnik.ru">support@bvestnik.ru</Link>
        </Box>

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
    </>
  );
};

export default AuthLayout;
