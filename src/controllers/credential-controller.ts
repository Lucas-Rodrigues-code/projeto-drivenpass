import { Request, Response } from "express";
import { credentialService } from "../services/credential-service.js";

export async function createCredential(req: Request, res: Response) {
    const { username, password, url , title} = res.locals.credential;
    const  userId  = res.locals.userId;
    
    try {
        const credential = await credentialService.create(title, url,username,password,userId );
        
        return res.status(200).send(credential)
    } catch (error) {
        if(error.name === "Conflict"){
            res.status(409).send(error)
        }
        res.status(500)
    }
}

export async function getAllCredential(req: Request, res: Response) {
    const  userId  = res.locals.userId;
    
    try {
        const credential = await credentialService.getCredential(userId);
        
        return res.status(200).send(credential)
    } catch (error) {
        res.status(500)
    }
}

