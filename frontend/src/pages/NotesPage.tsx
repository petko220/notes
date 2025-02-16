import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Fab,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Unauthorized: No token found", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
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
      await axios.delete(`http://localhost:5000/api/notes/${deleteDialog.noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== deleteDialog.noteId));
      setSnackbar({ open: true, message: "Note deleted successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete note", severity: "error" });
    } finally {
      setDeleteDialog({ open: false, noteId: null });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container sx={{ mt: 4, position: "relative" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
        Your Notes
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto" }} />
      ) : (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {note.content.length > 100 ? note.content.substring(0, 100) + "..." : note.content}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                  <IconButton color="primary" onClick={() => navigate(`/notes/edit/${note.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => setDeleteDialog({ open: true, noteId: note.id })}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button for Adding a New Note */}
      <Tooltip title="Add Note">
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={() => navigate("/notes/create")}
        >
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NotesPage;
