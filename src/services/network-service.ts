import Cryptr from 'cryptr';
import { idError } from '../errors/errors';
import { networkRepository } from '../repositories/network-repository';

export async function create(title: string, network: string, password: string, userId: number) {

    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    const hashedPassword = cryptr.encrypt(password);
    return networkRepository.create(
        title,
        network,
        hashedPassword,
        userId
    );
}

async function getAllNetwork(userId: number) {
    let network = await networkRepository.findAllNetwork(userId)
    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    for (let i = 0; i < network.length; i++) {
        network[i].password = cryptr.decrypt(network[i].password)
    }
    return network
}

async function getNetworklById(id: number, userId: number) {
    let network = await networkRepository.getNetworklById(id)
    if (!network) {
        throw idError()
    }
    if (network.user.id !== userId) {
        throw idError()
    }
    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    network.password = cryptr.decrypt(network.password)

    return network
}

async function deleteNetworkById(id: number, userId: number) {
    const network = await networkRepository.getNetworklById(id)

    if (!network) {
        throw idError()
    }
    if (network.user.id !== userId) {
        throw idError()
    }
    return await networkRepository.deleteNetworkById(id)

}


export const networkService = {
    create,
    getAllNetwork,
    getNetworklById,
    deleteNetworkById
}