"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSongToPlaylist = exports.addPlaylist = exports.findPlaylists = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findPlaylists = async (_req, res) => {
    try {
        const data = await prisma.playlist.findMany({ include: { songs: true } });
        res.status(200).json({ ok: true, data: data });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
exports.findPlaylists = findPlaylists;
const addPlaylist = async (req, res) => {
    try {
        const { name, user } = req.body;
        const playlist = await prisma.playlist.create({
            data: {
                name,
                user: { connect: { id: user } }
            },
        });
        res.status(201).json({ ok: true, message: "Playlist creada correctamente", data: playlist });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
exports.addPlaylist = addPlaylist;
const addSongToPlaylist = async (req, res) => {
    try {
        const { id_playlist, id_song } = req.body;
        const result = await prisma.playlist.update({
            where: {
                id: id_playlist
            },
            data: {
                songs: {
                    connect: {
                        id: id_song
                    }
                }
            }
        });
        res.status(201).json({ ok: true, message: "Canción agregada", data: result });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
exports.addSongToPlaylist = addSongToPlaylist;
