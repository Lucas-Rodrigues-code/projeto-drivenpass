import express from "express";
import { usersRouter } from "./routers/user-router.js";
var server = express();
server.get("/health", function (req, res) {
    res.send("ok");
});
server.use(usersRouter);
server.listen(4000, function () {
    console.log("Executando");
});
