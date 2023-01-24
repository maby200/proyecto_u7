import type { Request, Response } from "express";
import prisma from "../../datasource/";
import { verify } from "jsonwebtoken";


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
            "67e8aeee5939a45753d931c9871768623ab3f2c68c0c2fa07b9f16349ccc5b7d83881b7dd625df2ae308db59864b2e0c318ac29d8809cca89f3e9bffab1a0a6e", 
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
