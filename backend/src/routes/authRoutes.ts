import express, { Request, RequestHandler, Response } from "express";
import { userRegister,login, userProfile} from "../controllers/auth";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();

const prisma = new PrismaClient();



router.post('/register', (userRegister as unknown) as RequestHandler);
router.post('/login', (login as unknown) as RequestHandler);
router.get('/details',authenticate,(userProfile as unknown) as RequestHandler)


export default router;


