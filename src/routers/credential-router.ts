import { Router } from "express";
import { createCredential, getAllCredential } from "../controllers/credential-controller.js";
import { validateBodyCredential } from "../middlewares/validation-middleware.js";
import { authenticateToken } from "../middlewares/validationToken-middleware.js";

const credentialRouter = Router();

credentialRouter.post("/credential",authenticateToken,validateBodyCredential,createCredential);
credentialRouter.get("/credential",authenticateToken,getAllCredential);
credentialRouter.get("/credential/:id");
credentialRouter.delete("/credential/:id");

export { credentialRouter };