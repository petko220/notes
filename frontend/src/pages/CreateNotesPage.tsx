import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleCreateNote = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });

    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Unauthorized: No token found", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: "Note created successfully!", severity: "success" });
      setTimeout(() => navigate("/notes"), 1500); // Redirect after success
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || "Failed to create note", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create a New Note
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateNote}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Create Note"}
      </Button>

      {/* Snackbar for messages */}
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

export default CreateNotePage;
