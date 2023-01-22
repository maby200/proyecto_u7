import { Router } from "express";
import { findPlaylists, addPlaylist, addSongToPlaylist } from "./controller";
const playlistRouter: Router = Router();

playlistRouter.get("/", findPlaylists);
playlistRouter.post("/", addPlaylist);
playlistRouter.put("/addsong", addSongToPlaylist);

export default playlistRouter;