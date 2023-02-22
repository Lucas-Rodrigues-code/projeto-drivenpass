import { Router } from "express";
import { createCredential, deleteCredentialById, getAllCredential, getCredentialById } from "../controllers/credential-controller";
import { validateBodyCredential } from "../middlewares/validation-middleware";
import { authenticateToken } from "../middlewares/validationToken-middleware";

const credentialRouter = Router();

credentialRouter.post("/credential",authenticateToken,validateBodyCredential,createCredential);
credentialRouter.get("/credential",authenticateToken,getAllCredential);
credentialRouter.get("/credential/:id",authenticateToken,getCredentialById);
credentialRouter.delete("/credential/:id",authenticateToken,deleteCredentialById);

export { credentialRouter };