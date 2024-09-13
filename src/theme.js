import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";

// Create a theme instance.
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 901,
      lg: 1200,
      xl: 1536,
      sxl: 1700,
    },
  },
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
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            color: "rgba(0, 0, 0, 0.87) !important",
            WebkitTextFillColor: "rgba(0, 0, 0, 0.87) !important",
            "&::before": {
              borderBottomStyle: "solid !important",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { height: "41px", textTransform: "uppercase" } },
      defaultProps: { variant: "contained" },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(0, 155, 0, 0.10)" },
          "&.active": {
            backgroundColor: "rgba(0, 155, 0, 0.10)",
            cursor: "default",
          },
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
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          ".MuiFormControlLabel-label": {
            width: "100%",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          ".MuiPagination-ul": {
            justifyContent: "flex-end",
          },
          ".Mui-selected": {
            borderRadius: "5px",
            backgroundColor: "#009B00 !important",
            color: "#FFFFFF !important",
            cursor: "default !important",
          },
          ".MuiButtonBase-root": {
            borderRadius: "5px !important",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            pointerEvents: "none",
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          ".MuiPickersLayout-actionBar": {
            justifyContent: "center",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
