import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ovelh.AI",
  description: "Tosquia inteligente — dados e mercado ovino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
