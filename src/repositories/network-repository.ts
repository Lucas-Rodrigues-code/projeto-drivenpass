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
    return network
}

async function getNetworklById(id: number) {
    const network = await prisma.network.findUnique({
        where: {
            id
        },
        include: { user :true}
    })
    return network
}

async function deleteNetworkById(id: number) {
    const network = await prisma.network.delete({ where: { id } });
    return network
}

export const networkRepository = {
    create,
    findAllNetwork,
    getNetworklById,
    deleteNetworkById
}