import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import  prisma  from "../database/database";

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).send({message:"You must be signed in to continue"});
  
    const token = authHeader.split(" ")[1];
    if (!token) return  res.status(401).send({message:"You must be signed in to continue"});
    try {
      
      const { userId } = jwt.verify(token, process.env.JWT_SECRET,) as JWTPayload;
      
      const session = await prisma.session.findFirst({
        where: {
          token,
        },
      });
  
      if (!session) return res.status(401).send({message:"You must be signed in to continue"});
      
      res.locals.userId = userId;
      next();
    } catch (err) {
      if(err.name === "JsonWebTokenError"){
        return res.status(401).send({message:"You must be signed in to continue"});
      }
      
    }
  }
  type JWTPayload = {
    userId: number;
  };