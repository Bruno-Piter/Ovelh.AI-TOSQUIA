import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ovelh.AI",
  description: "Tosquia inteligente — dados e mercado ovino",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
