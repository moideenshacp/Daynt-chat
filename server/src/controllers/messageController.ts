import chatService from "../services/chatService";
import { Request, Response } from "express"; // Ensure correct types

export const fetchMessage = async (req: Request, res: Response) => {
    try {
        const messages = await chatService.fetchMessage();
        if (messages) {
            res.status(200).json(messages); 
        } else {
            res.status(404).json({ message: "No messages found." }); 
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
