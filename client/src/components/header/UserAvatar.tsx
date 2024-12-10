import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { cookies } from "next/headers";

interface User {
	name?: string;
	avatar?: string;
}

interface Props {
	className?: string;
	user?: User;
}

const UserAvatar: React.FC<Props> = ({ className, user }) => {
	const handleLogout = (): void => {
		cookies().delete("token");
		window.location.reload();
	};
	return (
		<div className={className}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={user?.avatar} />
						<AvatarFallback>
							{user
								? user?.name?.trim().split("")[0].toUpperCase()
								: "#"}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link href={"/profile"}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>History</DropdownMenuItem>
					<DropdownMenuItem>Playlists</DropdownMenuItem>
					<DropdownMenuItem>
						<LogoutButton />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserAvatar;
