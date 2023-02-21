import { Router } from "express";
import { createNetwork, deleteNetworklById, getAllNetwork, getNetworklById } from "../controllers/network-controller.js";
import { validateBodyNetwork } from "../middlewares/validation-middleware.js";
import { authenticateToken } from "../middlewares/validationToken-middleware.js";

const networklRouter = Router();

networklRouter.post("/network", authenticateToken,validateBodyNetwork,createNetwork);
networklRouter.get("/network", authenticateToken,getAllNetwork);
networklRouter.get("/network/:id", authenticateToken,getNetworklById);
networklRouter.delete("/network/:id", authenticateToken,deleteNetworklById);

export { networklRouter };