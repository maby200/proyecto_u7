import { UserRouter } from "../components";

const routes = [["users", UserRouter]]

export const router = (app:any) => {
    routes.forEach(([path, controller]) => 
    app.use(`/api/v1/${path}`, controller))
    ;
};