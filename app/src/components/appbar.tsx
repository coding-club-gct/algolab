"use client";

import { AppBar, Toolbar } from "@mui/material";
import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <AppBar color="transparent">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
