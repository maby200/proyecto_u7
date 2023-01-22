import { UserRouter } from "../components";
import { playlistRouter } from "../components";
 
const routes = [["users", UserRouter],["playlist", playlistRouter]]

export const router = (app:any) => {
    routes.forEach(([path, controller]) => 
    app.use(`/api/v1/${path}`, controller))
    ;
};