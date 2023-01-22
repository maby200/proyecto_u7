import { router } from "./router"
import express, { type Application } from "express";

export const app:Application = express()

app.use(express.json())
router(app)
