import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { UserProvider } from "@/context/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pet Food",
  icons: [
    { rel: "icon", url: "/pet.png", type: "image/png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/pet.png",
      type: "image/png",
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <UserProvider>
        <html lang="pt-br">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </UserProvider>
    </Provider>
  );
}
