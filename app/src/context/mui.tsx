"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import { muiDarkThemeConfig, muiLightThemeConfig } from "@coding-club-gct/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "./darkmode";

const ThemeContext = createContext<(() => void) | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { darkMode } = useContext(DarkModeContext);
  const theme = darkMode ? createTheme({ ...muiDarkThemeConfig }) : createTheme({ ...muiLightThemeConfig });
  return (
    <ThemeContext.Provider value={null}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
