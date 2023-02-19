import bcrypt from "bcrypt";
import { titleAlreadyInUse } from "../errors/email-error.js";
import { credentialRepository } from "../repositories/credential-repository.js";

export async function create(title:string, url:string,username:string,password:string,userId:number) {
    await rulesCredential(userId,title)

    const hashedPassword = await bcrypt.hash(password, 12);
    return credentialRepository.create(
        title,
        url,
        username,
        hashedPassword,
        userId
    );
}

async function rulesCredential(userId:number,title:string) {
        const uniqueTitle = await credentialRepository.findByid(userId,title)
        if(!uniqueTitle){
            return
        }
          if(uniqueTitle.title === title){
            throw titleAlreadyInUse()
        }  
}

export const credentialService = {
    create
}