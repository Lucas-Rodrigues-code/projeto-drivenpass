import prisma from "../database/database.js"

async function create(title: string, url: string, username: string, password: string, userId: number) {
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

async function findByid(userId: number, title: string) {
    const credential = await prisma.credential.findFirst({
        where: {
            userId,
            title
        }
    })
    
    return credential
    
}

async function findAllCredential(userId: number) {
    const credential = await prisma.credential.findMany({
        where: {
            userId
        }
    })
    return credential
}

async function getCredentialById(id: number) {
    const credential = await prisma.credential.findUnique({
        where: {
            id
        },
        include: { user :true}
    })
    return credential
}

async function deleteCredentialById(id: number) {
    const credential = await prisma.credential.delete({ where: { id } });
    return credential
}

export const credentialRepository = {
    findByid,
    create,
    findAllCredential,
    getCredentialById,
    deleteCredentialById
}