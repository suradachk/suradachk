import "./globals.css";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SURADACHK",
  description: "MY RESUME",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="viewport-fit=cover" />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={spaceMono.className}>{children}</body>
    </html>
  );
}
