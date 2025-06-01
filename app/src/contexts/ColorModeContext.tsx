import { createContext, useContext } from "react";

export interface ColorModeContextProps {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = createContext<
  ColorModeContextProps | undefined
>(undefined);

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context)
    throw new Error("useColorMode deve ser usado dentro do ColorModeProvider");
  return context;
};
