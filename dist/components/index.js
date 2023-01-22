"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRouter = exports.UserRouter = void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var playlist_1 = require("./playlist");
Object.defineProperty(exports, "playlistRouter", { enumerable: true, get: function () { return __importDefault(playlist_1).default; } });
