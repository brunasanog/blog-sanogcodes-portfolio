import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Sanog Codes | Tecnologia",
  description:
    "Um blog sobre tecnologia, programação e o mundo da web, feito por uma desenvolvedora em formação.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={spaceMono.className}>{children}</body>
    </html>
  );
}
