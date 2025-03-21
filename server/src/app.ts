import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db";
import authRoutes from "./routes/authRoute";
import cookieParser from "cookie-parser";

dotenv.config();
connectDb();

const app = express();
app.use(cookieParser()); 

app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST","PUT","PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
