"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const playlistRouter = (0, express_1.Router)();
playlistRouter.get("/", controller_1.findPlaylists);
exports.default = playlistRouter;
