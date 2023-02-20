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


export const networkService = {
    create
}