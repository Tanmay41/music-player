import { cookies } from "next/headers";

interface User {
	name?: string;
	avatar?: string;
}

export const useGetUser = async () => {
	let user: User | null = null;
	try {
		const response = await fetch("http://localhost:9000/api/v1/auth/user", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Cookie: cookies().toString(),
			},
			credentials: "include",
		});
		const data = await response.json();
		user = data.success ? data.user : null;
	} catch (error) {
		console.error("Error fetching user:", error);
	}

	return user;
};
