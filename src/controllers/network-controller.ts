import { Request, Response } from "express";
import { networkService } from "../services/network-service.js";
export async function createNetwork(req: Request, res: Response) {
    const { title, network, password } = res.locals.network;
    const userId = res.locals.userId;

    try {
        const wifi = await networkService.create(title, network, password, userId);

        return res.status(200).send(wifi)
    } catch (error) {
        if (error.name === "Conflict") {
            res.status(409).send(error)
        }
        res.status(500)
    }
}