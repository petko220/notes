import pool from "../config/db";
import { Note } from "../models/note-model";

export class NoteRepository {
  // Create a note associated with a user
  static async create(userId: number, title: string, content: string): Promise<Note> {
    const query = `INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *`;
    const values = [userId, title, content];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Get all notes for a user
  static async getAll(userId: number): Promise<Note[]> {
    const query = `SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  // Get a single note by ID (only if it belongs to the user)
  static async getById(userId: number, id: number): Promise<Note | null> {
    const query = `SELECT * FROM notes WHERE id = $1 AND user_id = $2`;
    const result = await pool.query(query, [id, userId]);
    return result.rows.length ? result.rows[0] : null;
  }

  // Update a note (only if it belongs to the user)
  static async update(userId: number, id: number, title: string, content: string): Promise<Note | null> {
    const query = `
      UPDATE notes SET title = $1, content = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4 RETURNING *`;
    const values = [title, content, id, userId];
    const result = await pool.query(query, values);
    return result.rows.length ? result.rows[0] : null;
  }

  // Delete a note (only if it belongs to the user)
  static async delete(userId: number, id: number): Promise<boolean> {
    const query = `DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id`;
    const result = await pool.query(query, [id, userId]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
