"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const { theme, systemTheme } = useTheme();

	return (
		<div className="flex lg:justify-around justify-between items-center h-[calc(100dvh-5rem)]">
			{Math.random() < 0.5 ? (
				<Image
					src={
						theme === "dark" ||
						(theme === "system" && systemTheme === "dark")
							? "/PettingDoodleDark.svg"
							: "/PettingDoodle.svg"
					}
					alt="Woman petting a dog"
					className={"hidden lg:inline-block"}
					width={700}
					height={700}
				/>
			) : (
				<Image
					src={
						theme === "dark" ||
						(theme === "system" && systemTheme === "dark")
							? "/LayingDoodleDark.svg"
							: "/LayingDoodle.svg"
					}
					alt="Woman petting a dog"
					className={"hidden lg:inline-block"}
					width={700}
					height={700}
				/>
			)}
			{children}
		</div>
	);
}
