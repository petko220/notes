import { NoteRepository } from "../repositories/noteRepository";
import { Note } from "../models/note-model";

export class NoteService {
  // Create a new note
  static async createNote(title: string, content: string): Promise<Note> {
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    return await NoteRepository.create(title, content);
  }

  // Get all notes
  static async getAllNotes(): Promise<Note[]> {
    return await NoteRepository.getAll();
  }

  // Get a single note by ID
  static async getNoteById(id: number): Promise<Note | null> {
    if (!id || id <= 0) {
      throw new Error("Invalid note ID");
    }
    return await NoteRepository.getById(id);
  }

  // Update a note
  static async updateNote(id: number, title: string, content: string): Promise<Note | null> {
    if (!id || id <= 0) {
      throw new Error("Invalid note ID");
    }
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    return await NoteRepository.update(id, title, content);
  }

  // Delete a note
  static async deleteNote(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error("Invalid note ID");
    }
    return await NoteRepository.delete(id);
  }
}
