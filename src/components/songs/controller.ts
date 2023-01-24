import type { Request, Response } from "express";
import prisma from "../../datasource/";
import { Secret, verify } from "jsonwebtoken";


export const findAllSongs = async (req:Request, res: Response): Promise<void> => {
    const { authorization } = req.headers;
    const songs = await prisma.song.findMany();
    const songsPublic = await prisma.song.findMany({ where: { isPublic: true } });
    
    if (!authorization)
        res.status(200).json({
            ok: true, 
            error: "No autorizado",
            message: "Registrate para ver todas las canciones",
            data: songsPublic
        });

    else if (!authorization.startsWith("Bearer ")){
        res.status(200).json({
            error: "Error en el formato del token",
            message: "Registrate para ver todas las canciones",
            data: songsPublic
        });
    }

    else{
        const token = authorization.replace("Bearer ", "");
        verify(token, 
            process.env.TOKEN_SECRET as Secret, 
            (err, decoded) => {
        if (err)
             return res.status(200).json({
                 error: "Token inválido",
                 message: "Registrate para ver todas las canciones",
                 data: songsPublic
             });
        res.status(200).json({
            ok: true, 
            message: "Autorizado",
            data: songs
        });
            
        });
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
