import { Request, Response } from "express";
import { UserService } from "../services/userService";
import asyncHandler from "../middleware/asyncHandler";
import { body, validationResult } from "express-validator";

export class AuthController {
  static validateRegistration = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ];

  static register = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const token = await UserService.register(name, email, password);
    res.status(201).json({ token });
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    res.status(200).json({ token });
  });
}
