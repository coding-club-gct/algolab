"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import { muiDarkThemeConfig, muiLightThemeConfig } from "@coding-club-gct/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "./darkmode";

export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { darkMode } = useContext(DarkModeContext);
  const theme = darkMode ? createTheme({ ...muiDarkThemeConfig }) : createTheme({ ...muiLightThemeConfig });
  return (
    <ThemeContext.Provider value={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
