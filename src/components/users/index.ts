import { Router } from "express";
import * as ControllerUser from "./controller"
import { validateAuthorization } from "../middleware";

const userRouter:Router = Router();

userRouter.get("/get",validateAuthorization ,ControllerUser.findAdll)
userRouter.post("/signup", ControllerUser.signup)
userRouter.post("/login", ControllerUser.login)

export default userRouter;