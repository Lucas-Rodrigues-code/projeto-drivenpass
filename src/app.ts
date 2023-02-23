import express, { json,Express } from "express";
import cors from "cors";
import { credentialRouter } from "./routers/credential-router";
import { networklRouter } from "./routers/network-router";
import { usersRouter } from "./routers/user-router" 
import prisma from "./database/database";

const server = express();
server.use(cors())
server.use(json());
server.use(usersRouter)
server.use(credentialRouter) 
server.use(networklRouter)

server.listen(4000, async() => {
    console.log("Executando")
    
}) 
export default server;


