import { verify } from "jsonwebtoken";
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

    verify(token, 
           "67e8aeee5939a45753d931c9871768623ab3f2c68c0c2fa07b9f16349ccc5b7d83881b7dd625df2ae308db59864b2e0c318ac29d8809cca89f3e9bffab1a0a6e", 
           (err, decoded) => {
        if (err)
            return res.status(401).json({
                message: "Token invalido"
            });
        next();
    });
}