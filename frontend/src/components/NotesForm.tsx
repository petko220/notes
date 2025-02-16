import { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const noteSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(100, "Title must be less than 100 characters"),
  content: yup.string().required("Content is required"),
});

interface NoteFormProps {
  initialData?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
}

const NoteForm: React.FC<NoteFormProps> = ({ initialData, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(noteSchema),
    defaultValues: initialData || { title: "", content: "" },
  });

  const handleFormSubmit = async (data: { title: string; content: string }) => {
    setLoading(true);
    try {
      await onSubmit(data);
      setSnackbar({ open: true, message: "Success!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Something went wrong.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {initialData ? "Edit Note" : "Create Note"}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            multiline
            rows={4}
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : initialData ? "Update Note" : "Create Note"}
          </Button>
        </form>
      </CardContent>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default NoteForm;
