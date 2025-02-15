import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNotePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setSnackbar({ open: true, message: "Unauthorized: No token found", severity: "error" });
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to load note", severity: "error" });
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdateNote = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });

    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Unauthorized: No token found", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: "Note updated successfully!", severity: "success" });
      setTimeout(() => navigate("/notes"), 1500);
    } catch (err: any) {
      setSnackbar({ open: true, message: "Failed to update note", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Note
      </Typography>

      <TextField label="Title" fullWidth margin="normal" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Content" fullWidth multiline rows={4} margin="normal" variant="outlined" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleUpdateNote} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Update Note"}
      </Button>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditNotePage;
