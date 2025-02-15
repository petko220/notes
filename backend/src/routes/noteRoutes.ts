import { Router } from "express";
import { NoteController } from "../controllers/noteController";

const router = Router();

router.post("/notes", NoteController.createNote);
router.get("/notes", NoteController.getAllNotes);
router.get("/notes/:id", NoteController.getNoteById);
router.put("/notes/:id", NoteController.updateNote);
router.delete("/notes/:id", NoteController.deleteNote);

export default router;
