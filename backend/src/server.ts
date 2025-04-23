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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });


app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send("hello");
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})



