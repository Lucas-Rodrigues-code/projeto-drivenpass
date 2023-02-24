import { createSession, createUser } from "./user.factori";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import prisma from "database/database";

export async function generateValidToken(user?: User) {
    const incomingUser = user;
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

    await createSession(token);

    return token;
}


export type credential = {
    id?: number
    title: string,
    url: string,
    username: string,
    password: string,
    userId: number

}

export async function createCredential(title: string, url: string, username: string, password: string, userId: number): Promise<credential> {
    const credential = await prisma.credential.create({
        data: {
            title,
            url,
            username,
            password,
            userId
        }
    })
    return credential
}

