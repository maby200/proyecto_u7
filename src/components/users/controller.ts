import { Request, Response } from "express";
import prisma from "../../datasource";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

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
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            res.send("Envío incorrecto de datos")
            return
        }

        const user = await prisma.user.findFirst({
            where: { email },
        })
        if (!user) {
            res.send("Usuario equivocado")
            return
        }

        const isValid = await bcrypt.compare(password, user.password) && bcrypt.compare(email, user.email)
        if (!isValid) {
            res.send("Password incorrecto")
            return
        }

        const token = jwt.sign(
            {email, password}, 
            process.env.TOKEN_SECRET as Secret,
            {
                expiresIn: "1h",
            });
        res.status(201).json({ email, token });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Logeo incorrecto"
        });
    }
};