import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);

export default router;
