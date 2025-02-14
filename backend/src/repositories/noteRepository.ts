import pool from "../config/db";
import { Note } from "../models/note-model";

export class NoteRepository {
  // Create a new note
  static async create(title: string, content: string): Promise<Note> {
    const query = `INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *`;
    const values = [title, content];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Get all notes
  static async getAll(): Promise<Note[]> {
    const query = `SELECT * FROM notes ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  }

  // Get a single note by ID
  static async getById(id: number): Promise<Note | null> {
    const query = `SELECT * FROM notes WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  // Update a note
  static async update(id: number, title: string, content: string): Promise<Note | null> {
    const query = `
      UPDATE notes SET title = $1, content = $2, updated_at = NOW()
      WHERE id = $3 RETURNING *`;
    const values = [title, content, id];
    const result = await pool.query(query, values);
    return result.rows.length ? result.rows[0] : null;
  }

    // Delete a note
    static async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM notes WHERE id = $1 RETURNING id`;
        const result = await pool.query(query, [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}
