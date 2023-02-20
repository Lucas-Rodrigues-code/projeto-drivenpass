import prisma from "../database/database.js"

async function create(title: string, network: string, password: string, userId: number) {
    const credential = await prisma.network.create({
        data: {
            title,
            network,
            password,
            userId
        }
    })
    return credential
}

export const networkRepository = {
    create
}