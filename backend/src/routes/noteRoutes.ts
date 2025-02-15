import { Router } from "express";
import { NoteController } from "../controllers/noteController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/notes", authMiddleware, NoteController.createNote);
router.get("/notes", authMiddleware, NoteController.getAllNotes);
router.get("/notes/:id", authMiddleware, NoteController.getNoteById);
router.put("/notes/:id", authMiddleware, NoteController.updateNote);
router.delete("/notes/:id", authMiddleware, NoteController.deleteNote);

export default router;