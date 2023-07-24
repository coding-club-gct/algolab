"use client";

import { catppuccinColors } from "@coding-club-gct/theme";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { DarkModeContext } from "./darkmode";

export const CatppuccinContext = createContext(catppuccinColors.dark);
export function CatppuccinProvider({ children }: { children: ReactNode }) {
  const { darkMode } = useContext(DarkModeContext);
  const catppuccinColor = useMemo(() => (darkMode ? catppuccinColors.dark : catppuccinColors.light), [darkMode]);
  return <CatppuccinContext.Provider value={catppuccinColor}>{children}</CatppuccinContext.Provider>;
}
