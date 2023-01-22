import type { Request, Response } from "express";
import prisma from "../../datasource/";

export const findAllSongs = async (_req: Request, res:Response): Promise<void> => {
    try {
        
        const songs = await prisma.song.findMany();

        res.status(200).json({
            ok:true,
            data:songs,
        });

    } catch (error) {
        res.status(500).json({ok:false, message:error})
    }
}


export const findSongById = async (req: Request, res: Response): Promise<void> => {
    
    const { id } = req.params;

    try {
        const song = await prisma.song.findUnique({where: {id: Number(id)}});

        res.status(200).json({
            ok: true,
            data:song,
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message:error,
        });
    }

}

export const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, artist, album, year, genre, duration, isPublic} = req.body;
        const song = await prisma.song.create({
            data:{
                name : name,
                artist : artist,
                album : album,
                year : year,
                genre : genre,
                duration : duration,
                isPublic : isPublic,
            },
        });

        res.status(201).json({
            ok:true,
            message:"Canción creada",
            data: song
        });

    } catch (error) {
        res.status(500).json({ok: false, message:error});
    }
}
