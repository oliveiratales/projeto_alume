import { createTheme, type Theme } from "@mui/material/styles";
import { getDesignTokens } from "./palette";
import type { PaletteMode } from "@mui/material/styles";

export const getAppTheme = (mode: PaletteMode): Theme => {
  return createTheme(getDesignTokens(mode));
};
