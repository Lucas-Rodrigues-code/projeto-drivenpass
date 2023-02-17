import { NextFunction, Request, Response } from "express";
import { createUserSchema } from "../schemas/user-schema.js";
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
