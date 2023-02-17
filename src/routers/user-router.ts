import { Router } from "express";
import { userPost } from "../controllers/user-controller.js";
import { validateBody } from "../middlewares/validation-middleware.js";

const usersRouter = Router();

usersRouter.post("/",validateBody,userPost);

export { usersRouter };