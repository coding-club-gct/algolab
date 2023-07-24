import { ThemeProvider } from "@/context/mui";
import "./globals.css";
import { DarkModeProvider } from "@/context/darkmode";
import { CatppuccinProvider } from "@/context/catppuccin";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <ThemeProvider>
            <CatppuccinProvider>{children}</CatppuccinProvider>
          </ThemeProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
