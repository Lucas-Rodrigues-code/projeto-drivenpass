import { duplicatedEmailError } from "../errors/email-error.js"; 
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user-repository.js";
import { User } from ".prisma/client";

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
    console.log(userWithSameEmail)
    if (userWithSameEmail) {
        throw duplicatedEmailError();
      }
   

}





export const userService = {
    createUser,
};