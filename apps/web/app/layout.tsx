


import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "./components/Sidebar.tsx";
import Sessionprovider from "./components/SessionProvider.tsx";
import SessionProviderWrapper from "./components/SessionProvider.tsx";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (


    <html lang="en">
      <body className={inter.className}>
        
      <SessionProviderWrapper> {children}   </SessionProviderWrapper></body>

    </html>
  
  );
}
