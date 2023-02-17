import { Router } from "express";
import { userPost } from "../controllers/user-controller";
import { validateBody } from "../middlewares/validation-middleware";
var usersRouter = Router();
usersRouter.post("/", validateBody, userPost);
export { usersRouter };
