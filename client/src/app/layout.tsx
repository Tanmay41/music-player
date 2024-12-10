import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/ReduxProvider";

import { ThemeProvider } from "@/components/theme-provider";
import MusicPlayer from "@/components/MusicPlayer";

export const metadata: Metadata = {
	title: "MUssica",
	description: "Explore the world of music with MUssica",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="max-w-screen" lang="en">
			<body>
				<ReduxProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Header />
						{children}
						<MusicPlayer />
						<Toaster />
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
