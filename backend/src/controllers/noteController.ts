import { Request, Response, NextFunction } from "express";
import { NoteService } from "../services/noteService";
import asyncHandler from "../middleware/asyncHandler";

export class NoteController {
  // Create a new note
  static createNote = asyncHandler(async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const note = await NoteService.createNote(title, content);
    return res.status(201).json(note);
  });

  // Get all notes
  static getAllNotes = asyncHandler(async (req: Request, res: Response) => {
    const notes = await NoteService.getAllNotes();
    return res.status(200).json(notes);
  });

  // Get a single note by ID
  static getNoteById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const note = await NoteService.getNoteById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json(note);
  });

  // Update a note
  static updateNote = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const updatedNote = await NoteService.updateNote(id, title, content);
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json(updatedNote);
  });

  // Delete a note
  static deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deleted = await NoteService.deleteNote(id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(204).send();
  });
}
