"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const components_1 = require("../components");
const routesList = [["/api/v1/playlist", components_1.playlistRouter]];
const routers = (app) => {
    routesList.forEach(([path, controller]) => {
        app.use(path, controller);
    });
};
exports.routers = routers;
