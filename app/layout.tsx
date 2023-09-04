import "./globals.css";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";

const inter = Space_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SURADACHK",
  description: "my portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
