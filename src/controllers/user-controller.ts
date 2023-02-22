import { Request, Response } from "express";
import { userService } from "../services/user-service";

export async function userPost(req: Request, res: Response) {
    const { email, password } = res.locals.user;
    try {
        const user = await userService.createUser(email, password);
        return res.status(200).json({
            id: user.id,
            email: user.email
        })
    } catch (error) {
        if (error.name === "DuplicatedEmailError") {
            return res.status(409).send(error);
        }
        res.status(500)
    }
}

export async function userlogin(req: Request, res: Response) {
    const { email, password } = res.locals.user;
    try {
        const token = await userService.signIn(email, password)
        return res.status(200).send(token);

    } catch (error) {
        if (error.name === "InvalidCredentialsError") {
            return res.status(409).send(error);
        }
        res.status(500)
    }
}