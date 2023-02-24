import prisma from "database/database"

export async function createNetwork(title: string, network: string, password: string, userId: number) {
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