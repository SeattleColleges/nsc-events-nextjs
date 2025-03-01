import React, { useEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContextProvider from "./theme/providers";
import Footer from "@/components/Footer";

import { initializeMsal, msalInstance } from "@/msal/msal";
import {
	AuthenticatedTemplate,
	MsalProvider,
	UnauthenticatedTemplate,
} from "@azure/msal-react";

import ms from "";
import { ThemeContext } from "@emotion/react";
import App from "next/app";

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
	useEffect(() => {
		initializeMsal();
	}, []);

	return (
		<html lang="en">
			<MsalProvider instance={msalInstance}>
				<AuthenticatedTemplate>
					<ThemeContextProvider>
						<AppRouterCacheProvider>
							<ReactQueryProvider>
								<Navbar />
								<CssBaseline /> {/* Ensures consistent baseline styles */}
								{children}{" "}
								{/* TODO: Add Wrapper Div component after replacing CSS with MUI for consistency*/}
								<Footer />
							</ReactQueryProvider>
						</AppRouterCacheProvider>
					</ThemeContextProvider>
				</AuthenticatedTemplate>

				<UnauthenticatedTemplate>
					<ThemeContextProvider>
						<AppRouterCacheProvider>
							<ReactQueryProvider>
								<Navbar />
								<CssBaseline /> {/* Ensures consistent baseline styles */}
								{/* UNAUTHORIZED MESSAGE */}
								<Footer />
							</ReactQueryProvider>
						</AppRouterCacheProvider>
					</ThemeContextProvider>
				</UnauthenticatedTemplate>
			</MsalProvider>
		</html>
	);
}
