import { verify,Secret } from "jsonwebtoken";
import { NextFunction, Request, Response,  } from "express";


export function validateAuthorization(req:Request, res: Response, next:NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({
            ok: true, 
            message: "No autorizado"
        });
    if (!authorization.startsWith("Bearer "))
        return res.status(401).json({
            message: "Error en el formato del token"
        });
    
    const token = authorization.replace("Bearer ", "");

    verify(token, process.env.TOKEN_SECRET as Secret, 
           (err, decoded) => {
        if (err)
            return res.status(401).json({
                message: "Token invalido"
            });
        next();
    });
}