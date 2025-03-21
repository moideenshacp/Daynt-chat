import { Request, Response } from "express";
import authService from "../services/authService";
import { registerSchema } from "../validations/authValidation";
import { ZodError } from "zod";

export const register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body.formData); 
  console.log(req.body);
  
  try {
    const user = await authService.register(validatedData.name, validatedData.email, validatedData.password);
    if (user) {
      res.status(201).json(user);
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body.formData;
  try {
    const user = await authService.login(email, password);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
