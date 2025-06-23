import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#770275", // Botones morados
    },
    secondary: {
      main: "#ffa4fd", // Rosa para enlaces y errores
    },
    error: {
      main: "#ffa4fd",
    },
    background: {
      default: "#333333ab",
      paper: "#333333ab",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    grey: {
      300: "rgba(217, 217, 217, 1)",
      600: "rgba(68, 68, 68, 1)",
      900: "rgba(30, 30, 30, 1)",
    },
    action: {
      hover: "rgba(255, 255, 255, 0.1)",
      selected: "rgba(255, 255, 255, 0.2)",
    },
  },
  typography: {
    fontFamily: ["Inter", "Audiowide", "Orbitron", "sans-serif"].join(","),
    h1: {
      fontFamily: "Orbitron-Bold, Helvetica",
      fontWeight: 700,
      fontSize: "30px",
      lineHeight: "30px",
      color: "#ffffff",
      WebkitTextStroke: "2px #770275",
    },
    h2: {
      fontFamily: "Orbitron-Bold, Helvetica",
      fontWeight: 700,
      fontSize: "15px",
      lineHeight: "15px",
    },
    subtitle1: {
      fontFamily: "Audiowide-Regular, Helvetica",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "19.6px",
    },
    body1: {
      fontFamily: "Inter-Regular, Helvetica",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "14px",
    },
    body2: {
      fontFamily: "Inter-Regular, Helvetica",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16.8px",
    },
    caption: {
      fontFamily: "Inter-Regular, Helvetica",
      fontWeight: 400,
      fontSize: "10px",
      lineHeight: "14px",
      color: "#ffa4fd",
    },
    button: {
      fontFamily: "Orbitron-Bold, Helvetica",
      fontWeight: 700,
      fontSize: "15px",
      lineHeight: "15px",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: (factor) => `${factor * 4}px`,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#000000",
          backgroundImage: "url(/CEL.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
        },
        contained: {
          backgroundColor: "#08001b",
          "&:hover": {
            backgroundColor: "#110036",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            height: "34px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: "rgba(217, 217, 217, 1)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(217, 217, 217, 1)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#770275",
          },
        },
        input: ({ theme }) => ({
          ...theme.typography.body1,
          color: "#00000066",
          padding: "8px 16px",
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.subtitle1,
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.caption,
          marginLeft: 1,
          marginTop: 2,
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#770275",
          "&.Mui-checked": {
            color: "#770275",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#ffa4fd",
          textDecoration: "underline",
          "&:hover": {
            color: "#ffb8fd",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
        }),
        head: ({ theme }) => ({
          ...theme.typography.subtitle1,
        }),
        body: ({ theme }) => ({
          ...theme.typography.body1,
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          ...theme.typography.subtitle1,
        }),
        secondary: ({ theme }) => ({
          ...theme.typography.body2,
        }),
      },
    },
  },
});

// 👇 Aquí agregas el campo `custom` al theme si lo necesitas luego
appTheme.custom = {
  brand: {
    100: "rgba(245, 245, 245, 1)",
    800: "rgba(44, 44, 44, 1)",
    main: "#08001b",
  },
};

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
