import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { labels } from "~/utils/labels";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: labels.app_title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
