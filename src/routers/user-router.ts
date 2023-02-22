import { Router } from "express";
import { userlogin, userPost } from "../controllers/user-controller";
import { validateBody } from "../middlewares/validation-middleware";

const usersRouter = Router();

usersRouter.post("/user",validateBody,userPost);
usersRouter.post("/login",validateBody,userlogin);

export { usersRouter };