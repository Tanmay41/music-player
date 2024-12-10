const baseUrl: string =
	process.env.BACKEND_URL || "http://localhost:9000/api/v1/auth";

interface registerProps {
	name: String;
	email: String;
	gender: "male" | "female";
	password: String;
	confirmPassword: String;
}

export const register = async (data: registerProps) => {
	const response = await fetch(baseUrl + "/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});
	return await response.json();
};

interface loginProps {
	email: string;
	password: string;
}

export const login = async (data: loginProps) => {
	const response = await fetch(baseUrl + "/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});
	return await response.json();
};

export const logout = async () => {
	await fetch(baseUrl + "/logout", {
		method: "GET",
		credentials: "include",
	});
};
