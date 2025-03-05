"use client";

import { AuthProvider } from "./authContext";
import { StyleSheetManager } from "styled-components";

export default function ClientProvider({ children }) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "className"}>
      <AuthProvider>{children}</AuthProvider>
    </StyleSheetManager>
  );
}