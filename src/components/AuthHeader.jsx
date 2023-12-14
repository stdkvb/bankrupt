import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar, Link } from "@mui/material";

import logo from "../assets/images/logo.svg";

const AuthHeader = () => {
  return (
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
          to="route"
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
  );
};

export default AuthHeader;
