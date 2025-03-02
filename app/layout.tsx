import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContextProvider from "./theme/providers";
import Footer from "@/components/Footer";
import MsalWrapper from '@/components/MsalWrapper';

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
								<MsalWrapper>
									{children} {/* TODO: Add Wrapper Div component after replacing CSS with MUI for consistency*/}
								</MsalWrapper>
							<Footer />
						</ReactQueryProvider>
					</AppRouterCacheProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
