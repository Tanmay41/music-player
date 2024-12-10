import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: true,
	})
);

app.use("/api/v1", router);

// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("MongoDB connection error", err));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}/`);
});
