import { NextFunction, Request, Response } from "express";
import { createCredentialSchema, createNetworkSchema, createUserSchema } from "../schemas/user-schema";

export function validateBody(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    const { error } = createUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    res.locals.user = user;
    next();
}

export function validateBodyCredential(req: Request, res: Response, next: NextFunction) {
    const credential = req.body

    const { error } = createCredentialSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    res.locals.credential = credential;
    next();
}

export function validateBodyNetwork(req: Request, res: Response, next: NextFunction) {
    const network = req.body

    const { error } = createNetworkSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    res.locals.network = network;
    next();
}