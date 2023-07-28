"use client";

import { AppBar, Toolbar } from "@mui/material";
import { ReactNode } from "react";

export default function Appbar ({ children }: { children: ReactNode }) {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
