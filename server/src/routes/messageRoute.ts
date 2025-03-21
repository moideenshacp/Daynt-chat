import express from "express";
import { fetchMessage } from "../controllers/messageController";

const router = express.Router();

router.get("/fetchMessage", fetchMessage);

export default router;
