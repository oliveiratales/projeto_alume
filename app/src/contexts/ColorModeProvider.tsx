import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "../theme";
import { ColorModeContext } from "./ColorModeContext";

interface Props {
  children: React.ReactNode;
}

export const ColorModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
