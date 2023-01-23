import { Router } from "express";
import { findPlaylists, addPlaylist, addSongToPlaylist, findPlaylistsById } from "./controller";
const playlistRouter: Router = Router();

playlistRouter.get("/", findPlaylists);
playlistRouter.get("/:id", findPlaylistsById);
playlistRouter.post("/", addPlaylist);
playlistRouter.put("/addsong", addSongToPlaylist);

export default playlistRouter;