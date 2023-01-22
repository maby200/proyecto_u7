import { UserRouter } from "../components";
import { playlistRouter } from "../components";
import { songRouter } from "../components";
 
const routes = [
    ["users", UserRouter],
    ["playlist", playlistRouter],
    ["songs", songRouter]
]

export const router = (app:any) => {
    routes.forEach(([path, controller]) => 
    app.use(`/api/v1/${path}`, controller))
    ;
};