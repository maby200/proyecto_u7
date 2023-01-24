import { router } from "./router";
import express, { type Application } from "express";
import dotenv from "dotenv";
dotenv.config();

export const app: Application = express();

app.use(express.json());
router(app);