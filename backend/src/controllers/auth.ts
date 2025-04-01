import { Express, Response, Request } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { promises } from "dns";
const prisma = new PrismaClient();

// Extend the Request interface to include userId
declare module 'express-serve-static-core' {
    interface Request {
        userId?: string; // or number, depending on your user ID type
    }
}

export const userRegister = async (req: Request, res: Response): Promise<any> => {

    try{

        const {name, email, password } = req.body;

        const exitingUser = await prisma.user.findUnique({where: {email}});
        if(exitingUser){
            return res.status(400).json({message: "user already e"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        });
        

        res.status(201).json({message: "user verifies successfully", user});

    }catch(err){
        return res.status(500).json({message: "cannot be register",err});
    }

}

export const login = async(req: Request, res: Response): Promise<any> => {

    const SECRET_KEY=process.env.JWT_SECRET

    try{
        const {email,password} = req.body;

        const user = await prisma.user.findUnique({where: {email}});
    
        if(!user){
            return res.status(400).json({message: "user don't exist please register!"})
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Password or email"});
        }
        if(!SECRET_KEY){
            return res.status(401).json({message:"no"})
        }
    
        const token=jwt.sign({userId:user.id}, SECRET_KEY,{expiresIn:"1h"});
    
        res.json({ message: "Login successful", token });
    }
    catch(error){
        return res.status(500).json({message: "server failed"});

    }
    


}

export const userProfile = async(req: Request, res: Response): Promise<any> => {

    try {
        // Convert req.userId to a number
        const userId = req.userId ? parseInt(req.userId, 10) : undefined;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select:{ id: true, name: true, email: true}
        });

        if(!user){
            return res.status(401).json({message: "user not found!"});
        }

        res.json(user);
        
    } catch (error) {
        return res.status(500).json({message: "server failed"})
        
    }

}

