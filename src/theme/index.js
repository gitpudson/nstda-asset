import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#f57c00",
      },
      secondary: {
        main: "#1976d2",
      },
    },
  });