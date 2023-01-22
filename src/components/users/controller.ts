import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const findAdll = async (_req:Request, res:Response):Promise<void> => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({
            ok: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({ 
            ok:false, 
            message: error 
        });
    }
};

export const signup = async (req:Request, res:Response):Promise<void> => {
    try {
        const {name, email, password, date_born} = req.body;
        const hash = await bcrypt.hash(password, 13);
        await prisma.user.create({data: { 
            name: name,
            email: email,
            password: hash,
            date_born: new Date(date_born)
        }});

        res.status(201).json({ 
            ok:true,
            message: "Usuario creado correctamente" 
        });
    } catch (error) {
        res.status(500).json({ 
            ok:false, 
            message: error
        });
    }
};

export const login = async (req:Request, res:Response):Promise<void> => {
    const { name, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { name },
        })
        if (!user) {
            res.send("Usuario equivocado")
            return
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            res.send("Password incorrecto")
            return
        }
        const token = jwt.sign(
            {name, password}, 
            '67e8aeee5939a45753d931c9871768623ab3f2c68c0c2fa07b9f16349ccc5b7d83881b7dd625df2ae308db59864b2e0c318ac29d8809cca89f3e9bffab1a0a6e',
            {
                expiresIn: "1h",
            });
        res.status(201).json({ name, token });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Logeo incorrecto"
        });
    }
};