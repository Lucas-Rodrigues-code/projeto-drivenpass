import express, { json } from "express";
import { usersRouter } from "./routers/user-router.js"

const server = express();
server.use(json());
server.use(usersRouter)

server.listen(4000, () => {
    console.log("Executando")
})