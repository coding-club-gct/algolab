"use client";

import { ReactNode, createContext, useState } from "react";

export const DarkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});
export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode: () => setDarkMode((prev) => !prev) }}>{children}</DarkModeContext.Provider>;
}
