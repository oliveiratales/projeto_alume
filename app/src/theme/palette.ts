import type { PaletteMode } from "@mui/material/styles";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "#00dac0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#024953",
      contrastText: "#ffffff",
    },
    background: {
      default: mode === "light" ? "#f4f6f8" : "#121212",
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "#000000" : "#ffffff",
      secondary: mode === "light" ? "#555555" : "#cccccc",
    },
  },
});
