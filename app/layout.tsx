import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContextProvider from "./theme/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NSC Events",
  description: "Stay updated with the latest events at North Seattle College",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <AppRouterCacheProvider>
            <ReactQueryProvider>
              <Navbar />
              <CssBaseline /> {/* Ensures consistent baseline styles */}
              {children} {/* TODO: Add Wrapper Div component after replacing CSS with MUI for consistency*/}
            </ReactQueryProvider>
          </AppRouterCacheProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
