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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
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
      setSnackbar({ open: false, message: "", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: "Failed to load notes", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Unauthorized", severity: "error" });
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
      setSnackbar({ open: true, message: "Note deleted successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete note", severity: "error" });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Notes
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "10px" }} onClick={() => navigate("/notes/create")}>
        + Create New Note
      </Button>

      {loading ? <CircularProgress /> : null}

      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {note.content}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => navigate(`/notes/edit/${note.id}`)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteNote(note.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
