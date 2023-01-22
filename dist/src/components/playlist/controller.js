"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlaylists = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findPlaylists = async (req, res) => {
    try {
        const playlist = await prisma.playlist.findMany({ include: { user: true } });
        res.status(200).json({
            ok: true,
            data: playlist,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
exports.findPlaylists = findPlaylists;
