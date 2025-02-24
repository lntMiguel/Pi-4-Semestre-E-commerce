"use client"; // Indica que este é um componente do cliente

import { AuthProvider } from "../../componentes/authContext";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { StyleSheetManager } from "styled-components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indica que o código está sendo executado no cliente
  }, []);

  // Se ainda não estiver no cliente, evita renderizar para não gerar erro de hidratação
  if (!isClient) return null;

  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== "className"}>
          <AuthProvider>{children}</AuthProvider>
        </StyleSheetManager>
      </body>
    </html>
  );
}
