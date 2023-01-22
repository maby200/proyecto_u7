import { app } from "./app";

app.listen(process.env.PORT, () => console.log(`Server init at http://localhost:${process.env.PORT}`))