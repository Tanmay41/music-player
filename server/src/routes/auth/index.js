import express from "express";
import {
	editUser,
	getUser,
	login,
	logout,
	register,
} from "../../controler/user.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/user", getUser);
authRouter.patch("/edit", editUser);

export default authRouter;
