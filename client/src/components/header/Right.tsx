import React from "react";
import { Button } from "../ui/button";
import { useGetUser } from "@/hooks/getUser";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { ModeToggle } from "../toggleMode";

interface User {
	name?: string;
	avatar?: string;
}

const Right = async () => {
	const user: User | null = await useGetUser();
	return (
		<div className="h-full w-[60%] flex justify-end items-center gap-10">
			<ModeToggle />
			{user ? (
				<UserAvatar user={user} />
			) : (
				<div className="flex space-x-4">
					<Link href="/auth/login">
						<Button className="bg-blue-500 hover:bg-blue-700">
							Sign In
						</Button>
					</Link>
					<Link href="/auth/register">
						<Button className="bg-green-500 hover:bg-green-700">
							Register
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Right;
