import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
const breakpoints = createBreakpoints({});

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#009B00",
      secondary: "rgba(0, 155, 0, 0.10)",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#EF6C00",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.60)",
      white: "#FFFFFF",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: { root: { height: "41px", textTransform: "uppercase" } },
      defaultProps: { variant: "contained" },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(0, 155, 0, 0.10)" },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
          cursor: "pointer",
          textDecoration: "none",
          textUnderlineOffset: "3px",
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": { content: "none" },
          ".MuiAccordionSummary-content": { margin: "0" },
          ".MuiAccordionSummary-root .Mui-expanded": { minHeight: "unset" },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
