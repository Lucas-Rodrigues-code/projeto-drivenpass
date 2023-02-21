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

async function findAllNetwork(userId: number) {
    const network = await prisma.network.findMany({
        where: {
            userId
        }
    })
    console.log(network)
    return network
}

export const networkRepository = {
    create,
    findAllNetwork
}