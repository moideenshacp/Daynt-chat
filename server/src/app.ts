import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db";
import authRoutes from "./routes/authRoute";
import messageRoute from "./routes/messageRoute";
import cookieParser from "cookie-parser";


//dotenv config
dotenv.config();

//mongodb connection
connectDb();

const app = express();
app.use(cookieParser()); 


//cors set-up
app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST","PUT","PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", messageRoute);

export default app;
