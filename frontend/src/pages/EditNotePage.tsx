import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNotes, updateNote } from "../api/noteService";
import { Note } from "../types/note"; 
import NoteForm from "../components/NotesForm";

import { CircularProgress, Container } from "@mui/material";

const EditNotePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      try {
        const notes: Note[] = await fetchNotes(token);
        const noteToEdit = notes.find((note) => note.id.toString() === id);

        if (noteToEdit) {
          setNoteData(noteToEdit);
        }
      } catch (error) {
        console.error("Failed to load note:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  const handleUpdate = async (data: { title: string; content: string }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");

    await updateNote(token, id!, data.title, data.content); // ✅ Use updateNote instead of createNote
    navigate("/notes");
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return noteData ? <NoteForm initialData={noteData} onSubmit={handleUpdate} /> : <p>Note not found</p>;
};

export default EditNotePage;
