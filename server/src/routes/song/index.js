import express from "express";
import { getSong, getSongs, manual } from "../../controler/song.js";

const songRouter = express.Router();

songRouter.get("/", getSongs);
songRouter.get("/one", getSong);
songRouter.get("/manual", manual);

export default songRouter;
