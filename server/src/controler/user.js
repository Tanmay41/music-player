import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
	const { name, email, gender, password, confirmPassword } = req.body;
	if (password !== confirmPassword) {
		return res.status(400).json({
			success: false,
			message: "Passwords do not match",
		});
	}

	const temp = await User.find({ email: email });
	if (temp.length > 0) {
		return res.status(400).json({
			success: false,
			message: "this email already registered, please log in",
		});
	}
	let userAvatar = `https://avatar.iran.liara.run/public/?username=${email}`;

	if (gender) {
		userAvatar = `https://avatar.iran.liara.run/public/${
			gender == "male" ? "boy" : "girl"
		}/?username=${email}`;
	}

	const hashedPassword = bcrypt.hashSync(password, 10);
	const user = new User({
		name,
		email,
		password: hashedPassword,
		avatar: userAvatar,
	});

	await user.save();

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "30d", // Changed from "1m" to "30d" for a 30-day expiration
	});
	res.cookie("token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
	});
	return res.status(201).json({
		success: true,
		message: "User created",
		token,
	});
}

export async function login(req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	const isMatch = bcrypt.compareSync(password, user.password);
	if (!isMatch) {
		return res
			.status(401)
			.json({ success: false, message: "Invalid credentials" });
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		path: "/",
		domain: process.env.COOKIE_DOMAIN || undefined,
	});
	return res.status(200).json({
		success: true,
		message: "Logged in",
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
		},
	});
}

export async function getUser(req, res) {
	const token = req.cookies.token;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "User not logged in" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
		return res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("error in get user: " + error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
}

export async function editUser(req, res) {
	const token = req.cookies.token;
	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "User not logged in" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findByIdAndUpdate(decoded.id, req.body, {
			new: true,
		});
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
		return res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("error in edit user: " + error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
}

export async function logout(req, res) {
	console.log("...");
	res.clearCookie("token");
	return res.status(200).json({ success: true, message: "Logged out" });
}
