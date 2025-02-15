import { Request, Response } from "express";
import { NoteService } from "../services/noteService";
import asyncHandler from "../middleware/asyncHandler";

interface AuthRequest extends Request {
  user?: { userId: number };
}

export class NoteController {
  static createNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const { title, content } = req.body;
    const note = await NoteService.createNote(userId, title, content);
    return res.status(201).json(note);
  });

  static getAllNotes = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const notes = await NoteService.getAllNotes(userId);
    return res.status(200).json(notes);
  });

  static getNoteById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const id = parseInt(req.params.id);
    const note = await NoteService.getNoteById(userId, id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json(note);
  });

  static updateNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const updatedNote = await NoteService.updateNote(userId, id, title, content);
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json(updatedNote);
  });

  static deleteNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const id = parseInt(req.params.id);
    const deleted = await NoteService.deleteNote(userId, id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(204).send();
  });
}
