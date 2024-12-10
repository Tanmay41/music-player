import express from "express";
import authRouter from "./auth/index.js";
import songRouter from "./song/index.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/song", songRouter);

export default router;
