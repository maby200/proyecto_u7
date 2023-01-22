import { Router } from "express";
import * as Controller from "./controller";

const songRouter: Router = Router();

songRouter.get("/", Controller.findAllSongs);
songRouter.get("/:id", Controller.findSongById);
songRouter.post("/", Controller.createSong);