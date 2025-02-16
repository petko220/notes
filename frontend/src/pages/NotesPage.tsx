import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Fab,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NotesList from "../components/NotesList";
import { fetchNotes, deleteNote } from "../api/noteService";
const NotesPage = () => {
  const [notes, setNotes] = useState<{ id: number; title: string; content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; noteId: number | null }>({
    open: false,
    noteId: null,
  });

  const navigate = useNavigate();

  const loadNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Unauthorized: No token found", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      const data = await fetchNotes(token);
      setNotes(data);
    } catch (err: any) {
      setSnackbar({ open: true, message: "Failed to load notes", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async () => {
    if (deleteDialog.noteId === null) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Unauthorized", severity: "error" });
      return;
    }

    try {
      await deleteNote(token, deleteDialog.noteId);
      setNotes(notes.filter((note) => note.id !== deleteDialog.noteId));
      setSnackbar({ open: true, message: "Note deleted successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete note", severity: "error" });
    } finally {
      setDeleteDialog({ open: false, noteId: null });
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <Container sx={{ mt: 4, position: "relative" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
        Your Notes
      </Typography>

      {loading ? <CircularProgress sx={{ display: "block", mx: "auto" }} /> : <NotesList notes={notes} onDelete={(id) => setDeleteDialog({ open: true, noteId: id })} />}

      {/* Floating Action Button for Adding a New Note */}
      <Tooltip title="Add Note">
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }} onClick={() => navigate("/notes/create")}>
          <Add />
        </Fab>
      </Tooltip>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, noteId: null })}>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, noteId: null })}>Cancel</Button>
          <Button color="error" onClick={handleDeleteNote}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default NotesPage;
