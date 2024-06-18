import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/styles/index.scss";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import UserProvider from "./utils/UserContext";
import PaginationProvider from "./utils/PaginationContext";
import FiltersProvider from "./utils/FiltersContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <UserProvider>
        <PaginationProvider>
          <FiltersProvider>
            <App />
          </FiltersProvider>
        </PaginationProvider>
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>
);
