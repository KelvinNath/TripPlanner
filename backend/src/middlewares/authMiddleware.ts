import { Express } from "express";
import { access } from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = async (req:any , res:any ,next:any)=>{

    const token= await req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"access denied"});
    }
    try {
        const SECRET_KEY = process.env.JWT_SECRET; // Load SECRET_KEY from environment variables
        if (!SECRET_KEY) {
            return res.status(500).json({ message: "Internal server error: SECRET_KEY not set" });
        }
        const decoded:any = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "invalid token" });
    }
}