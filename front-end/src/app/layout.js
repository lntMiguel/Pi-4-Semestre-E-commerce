import { Geist, Geist_Mono } from "next/font/google";
import ClientProvider from "../../componentes/clientProvider"; // Novo componente para evitar erro de hidratação

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProvider>{children}</ClientProvider> {/* Agora dentro de um componente cliente */}
      </body>
    </html>
  );
}
