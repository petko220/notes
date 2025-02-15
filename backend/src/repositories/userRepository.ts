import pool from "../config/db";
import { User } from "../models/user-model";

export class UserRepository {
  // Create a new user
  static async createUser(name: string, email: string, hashedPassword: string): Promise<User> {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows.length ? result.rows[0] : null;
  }
}