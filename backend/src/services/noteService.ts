import { NoteRepository } from "../repositories/noteRepository";
import { Note } from "../models/note-model";

export class NoteService {
  // Create a new note
  static async createNote(userId: number, title: string, content: string): Promise<Note> {
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    return await NoteRepository.create(userId, title, content);
  }

  // Get all notes for a user
  static async getAllNotes(userId: number): Promise<Note[]> {
    return await NoteRepository.getAll(userId);
  }

  // Get a single note by ID
  static async getNoteById(userId: number, id: number): Promise<Note | null> {
    if (!id || id <= 0) {
      throw new Error("Invalid note ID");
    }
    return await NoteRepository.getById(userId, id);
  }

  // Update a note
  static async updateNote(userId: number, id: number, title: string, content: string): Promise<Note | null> {
    if (!id || id <= 0) {
      throw new Error("Invalid note ID");
    }
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    return await NoteRepository.update(userId, id, title, content);
  }

  // Delete a note
  static async deleteNote(userId: number, id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error("Invalid note ID");
    }
    return await NoteRepository.delete(userId, id);
  }
}
