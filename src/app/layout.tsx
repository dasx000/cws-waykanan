import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Co Working Space Way Kanan — Rumah Penyuluhan Pertanian",
  description:
    "Co Working Space Way Kanan adalah kelembagaan penyuluhan tingkat kabupaten: ruang kerja bersama, pendampingan usaha tani, dan pusat data pertanian untuk 15 kecamatan di Bumi Ramik Ragom.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${bricolageGrotesque.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
