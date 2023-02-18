import { Router } from "express";
import { userlogin, userPost } from "../controllers/user-controller.js";
import { validateBody } from "../middlewares/validation-middleware.js";

const usersRouter = Router();

usersRouter.post("/",validateBody,userPost);
usersRouter.post("/login",validateBody,userlogin);

export { usersRouter };