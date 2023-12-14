import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
const breakpoints = createBreakpoints({});

// Create a theme instance.
const theme = createTheme({
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

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          alignItems: "flex-start",
          "&.Mui-selected": {
            backgroundColor: "#E6F7FF",
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
