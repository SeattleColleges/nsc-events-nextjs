"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#3f50b5",
      main: "#155c0",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'lightgrey',
          color: "black",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(120, 18, 18, 0.1)',
          color: 'black'
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#fff",
          textDecorationColor: "#fff"
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        },
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px rgba(69, 69, 69) inset',
            '-webkit-text-fill-color': '#fff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#fff'
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(245, 241, 241, 0.1)',
        },
      }
    },
  } // end of components for dark theme
}); // end of dark theme block

darkTheme = responsiveFontSizes(darkTheme);

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#3f50b5",
      main: "#1565c0",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
    background: {
      default: "#EAEAEA",
    },
  },
}); //  end of light theme block

lightTheme = responsiveFontSizes(lightTheme);

export { darkTheme, lightTheme };
