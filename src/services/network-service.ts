import Cryptr from 'cryptr';
import { networkRepository } from '../repositories/network-repository.js';

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


export const networkService = {
    create,
    getAllNetwork
}