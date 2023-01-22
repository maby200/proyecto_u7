"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.findAdll = void 0;
const client_1 = require(".prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const findAdll = async (_req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            ok: true,
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
exports.findAdll = findAdll;
const signup = async (req, res) => {
    try {
        const { name, email, password, date_born } = req.body;
        const hash = await bcrypt_1.default.hash(password, 13);
        await prisma.user.create({ data: {
                name: name,
                email: email,
                password: hash,
                date_born: new Date(date_born)
            } });
        res.status(201).json({
            ok: true,
            message: "Usuario creado correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { name },
        });
        if (!user) {
            res.send("Usuario equivocado");
            return;
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            res.send("Password incorrecto");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ name, password }, '67e8aeee5939a45753d931c9871768623ab3f2c68c0c2fa07b9f16349ccc5b7d83881b7dd625df2ae308db59864b2e0c318ac29d8809cca89f3e9bffab1a0a6e', {
            expiresIn: "1h",
        });
        res.status(201).json({ name, token });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: "Logeo incorrecto"
        });
    }
};
exports.login = login;
