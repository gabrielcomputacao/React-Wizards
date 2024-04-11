import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wizard Creator",
  description: "Facilidade em criar Wizard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
