"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/api/auth";

const LogoutButton = () => {
	return (
		<Button
			variant="destructive"
			onClick={async () => {
				await logout();
				window.location.reload();
			}}
		>
			Logout
		</Button>
	);
};

export default LogoutButton;
