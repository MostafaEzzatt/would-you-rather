import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    github: {
      light: "#4B4B4B",
      main: "#333",
      dark: "#181818",
      contrastText: "#fff",
    },
    optionOne: {
      light: "#3E55CD",
      main: "#3345A4",
      dark: "#2E3E94",
      contrastText: "#fff",
    },
    optionTwo: {
      light: "#C04D4D",
      main: "#B74B4B",
      dark: "#B14848",
      contrastText: "#fff",
    },
    answered: {
      light: "#262626",
      main: "#222222",
      dark: "#1F1F1F",
      contrastText: "#fff",
    },
  },
});

export default theme;
