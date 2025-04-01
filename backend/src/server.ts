import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes";
import prisma from "./lib/prisma";
import cors from "cors";


dotenv.config();



const app = express();

// Configure CORS
app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if needed
}));


app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send("hello");
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})



