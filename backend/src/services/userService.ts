import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
  // Register a new user
  static async register(name: string, email: string, password: string): Promise<string> {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.createUser(name, email, hashedPassword);

    return this.generateToken(newUser.id!);
  }

  // Login a user
  static async login(email: string, password: string): Promise<string> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return this.generateToken(user.id!);
  }

  // Generate JWT token
  private static generateToken(userId: number): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }
}
