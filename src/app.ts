import express, { json, Express } from "express";
import cors from "cors";
import { credentialRouter } from "./routers/credential-router";
import { networklRouter } from "./routers/network-router";
import { usersRouter } from "./routers/user-router"

const app = express();
app.use(cors())
app.use(json());
app.use(usersRouter)
app.use(credentialRouter)
app.use(networklRouter)

export default  app ;


