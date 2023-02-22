import Cryptr from 'cryptr';
import { idError, titleAlreadyInUse } from "../errors/errors";
import { credentialRepository } from "../repositories/credential-repository";

export async function create(title: string, url: string, username: string, password: string, userId: number) {
    await rulesCredential(userId, title)

    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    const hashedPassword = cryptr.encrypt(password);
    return credentialRepository.create(
        title,
        url,
        username,
        hashedPassword,
        userId
    );
}

async function rulesCredential(userId: number, title: string) {
    const uniqueTitle = await credentialRepository.findByid(userId, title)
    if (!uniqueTitle) {
        return
    }
    if (uniqueTitle.title === title) {
        throw titleAlreadyInUse()
    }
}

async function getCredential(userId: number) {
    let credential = await credentialRepository.findAllCredential(userId)
    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    for (let i = 0; i < credential.length; i++) {
        credential[i].password = cryptr.decrypt(credential[i].password)
    }
    return credential
}

async function getCredentialById(id: number,userId:number) {
    let credential = await credentialRepository.getCredentialById(id)
    if (!credential) {
        throw idError()
    }
    if (credential.user.id !== userId) {
        throw idError()
      }
    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    credential.password = cryptr.decrypt(credential.password)

    return credential
}

 async function deleteCredentialById(id: number,userId:number) {
   const credential = await credentialRepository.getCredentialById(id)
   
    if (!credential) {
        throw idError()
    }
    if (credential.user.id !== userId) {
        throw idError()
      }
    let credentiall = await credentialRepository.deleteCredentialById(id)
    return credentiall
} 

export const credentialService = {
    create,
    getCredential,
    getCredentialById,
    deleteCredentialById
}