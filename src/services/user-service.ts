import { duplicatedEmailError, invalidCredentialsError } from "../errors/errors.js";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user-repository.js";
import { User } from ".prisma/client";
import jwt from "jsonwebtoken";
import sessionRepository from "../repositories/sesseion-repository.js";

export async function createUser(email: string, password: string): Promise<User> {
    await uniqueEmail(email)

    const hashedPassword = await bcrypt.hash(password, 12);
    return userRepository.create(
        email,
        hashedPassword
    );
}

async function uniqueEmail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);

    if (userWithSameEmail) {
        throw duplicatedEmailError();
    }
}

async function signIn(email: string, password: string) {

    const user = await getUserOrFail(email);

    await validatePasswordOrFail(password, user.password);

    const token = await createSession(user.id);

    return token
}

async function getUserOrFail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw invalidCredentialsError();

    return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    return await sessionRepository.create(
        token,
        userId,
    );
}

export const userService = {
    createUser,
    signIn
}