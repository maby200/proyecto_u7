import { Request, Response } from "express";
import prisma from "../../datasource/";

export const findPlaylists = async (_req: Request, res: Response): Promise<void> => {
	try{
		const data = await prisma.playlist.findMany({include:{songs:true}});
		res.status(200).json({ok:true, data: data})
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error
		});
	}
};


export const findPlaylistsById = async (req: Request, res: Response): Promise<void> => {
	try{
		const id = Number(req.params.id);
		
		const data = await prisma.playlist.findFirst( {where:{ id }, include: {songs: true} });
		res.status(200).json({ok:true, data: data})
	} catch (error) {
		
		res.status(500).json({
			ok: false,
			message: error
		});
	}
};


export const addPlaylist = async (req: Request, res: Response): Promise<void> => {
	try {
		const {name, user} = req.body;
		const playlist = await prisma.playlist.create({
			data: {
				name,
				user: {connect:{id: user}}
			},
		});
	res.status(201).json({ ok:true, message: "Playlist creada correctamente", data: playlist},)
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error
		});
	}
};


export const addSongToPlaylist = async (req: Request, res: Response): Promise<void> => {
	try{
		const {id_playlist, id_song} = req.body;
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
		res.status(201).json({ ok: true, message: "Canción agregada", data: result})
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error
		});
	}
};