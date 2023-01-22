"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const components_1 = require("../components");
const components_2 = require("../components");
const routes = [["users", components_1.UserRouter], ["playlist", components_2.playlistRouter]];
const router = (app) => {
    routes.forEach(([path, controller]) => app.use(`/api/v1/${path}`, controller));
};
exports.router = router;
