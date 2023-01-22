"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const playlistRouter = (0, express_1.Router)();
playlistRouter.get("/", controller_1.findPlaylists);
playlistRouter.post("/", controller_1.addPlaylist);
playlistRouter.put("/addsong", controller_1.addSongToPlaylist);
exports.default = playlistRouter;
