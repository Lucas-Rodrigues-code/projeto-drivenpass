import express, { json } from "express";
import { credentialRouter } from "./routers/credential-router.js";
import { networklRouter } from "./routers/network-router.js";
import { usersRouter } from "./routers/user-router.js";
var server = express();
server.use(json());
server.use(usersRouter);
server.use(credentialRouter);
server.use(networklRouter);
server.listen(4000, function () {
    console.log("Executando");
});
