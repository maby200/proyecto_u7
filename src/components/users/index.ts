import { Router } from "express";
import * as ControllerUser from "./controller"

const userRouter:Router = Router();

userRouter.get("/get", ControllerUser.findAdll)
userRouter.post("/signup", ControllerUser.signup)
userRouter.post("/login", ControllerUser.login)

export default userRouter;